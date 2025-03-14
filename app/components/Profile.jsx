import React,{useState, useEffect} from "react";
import { SafeAreaView, View, Image, Text, ImageBackground, StyleSheet, TouchableOpacity, Alert, Linking } from "react-native";
import { auth } from "./Firebase/FirebaseConfig";
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import GoogleConfig from './GoogleSignIn/Configure';


export default function Profile({navigation}) {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
    return unsubscribe;
  }, []);

  const handleLogout = async () => {
    Alert.alert(
      "Logout Confirmation",
      "Are you sure you want to log out?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Logout",
          onPress: async () => {
            try {
              GoogleConfig();
              // Revoke Google access and sign out from Firebase
              await GoogleSignin.revokeAccess();
              await GoogleSignin.signOut();
              await auth.signOut();
  
              setUser(null); // Clear user state
              navigation.replace("Login"); // Redirect to login screen
            } catch (error) {
              console.error("Logout error:", error);
            }
          },
        },
      ]
    );
  };
  const menuItems = [
    {
      label: "Personal Information",
      icon: "https://img.icons8.com/?size=100&id=84355&format=png&color=000000",
      onPress: () => Linking.openURL(`https://myaccount.google.com/?authuser=${user.email}`),
    },
    {
      label: "Support",
      icon: "https://img.icons8.com/?size=100&id=84124&format=png&color=000000",
      onPress: () => alert("Support Page Coming Soon!"),
    },
    {
      label: "Settings",
      icon: "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/a2792ce9-3047-48c7-b108-4742542fcc56",
      onPress: () => alert("Settings Page Coming Soon!"),
    },
    {
      label: "Logout",
      icon: "https://img.icons8.com/?size=100&id=2445&format=png&color=000000",
      onPress: handleLogout,
    },
  ];
  return (
    <SafeAreaView style={styles.container} screenOptions = {{headerShown: false}}>
      <ImageBackground source={{ uri: user?.photoURL || "https://via.placeholder.com/100" }} style={styles.avatar}>
        {!user?.photoURL && <Text style={styles.avatarText}>{user?.displayName?.charAt(0) || "U"}</Text>}
      </ImageBackground>
      <Text style={styles.name}>{user?.displayName}</Text>
      <View style={styles.menu}>
        {menuItems.map((item, index) => (
          <TouchableOpacity key={index} style={styles.menuItem} onPress={item.onPress}>
            <Image source={{ uri: item.icon }} style={styles.menuIcon} />
            <Text style={styles.menuText}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
}



const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#FFF" },
  title: { fontSize: 22, fontWeight: "bold", display: "flex", alignItems: "center", justifyContent: "center"},
  avatar: { width: 100, height: 100, justifyContent: "center", alignItems: "center", borderRadius: 50, overflow: "hidden" },
  avatarText: { fontSize: 40, fontWeight: "bold" },
  name: { fontSize: 20, fontWeight: "bold", marginVertical: 10 },
  menu: { width: "80%" },
  menuItem: { flexDirection: "row", alignItems: "center", paddingVertical: 10 },
  menuIcon: { width: 24, height: 24, marginRight: 10 },
  menuText: { fontSize: 16 },
});