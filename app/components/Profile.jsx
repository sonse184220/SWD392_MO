import React, { useState, useEffect } from "react";
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity, Alert, Linking } from "react-native";
import { Avatar, Surface, Title, Caption, Divider, List } from 'react-native-paper';
import { ChevronRight, LogOut, User, HelpCircle, Settings, Star } from 'lucide-react-native';
import { auth } from "./Firebase/FirebaseConfig";
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import GoogleConfig from './GoogleSignIn/Configure';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Profile({ navigation }) {
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
              await AsyncStorage.clear();
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

  return (
    <SafeAreaView style={styles.container}>
      <Surface style={styles.headerContainer}>
        <View style={styles.headerContent}>
          <Avatar.Image 
            size={80} 
            source={{ uri: user?.photoURL || "https://ui-avatars.com/api/?name=" + (user?.displayName || "User") + "&background=FF475F&color=fff" }} 
          />
          <View style={styles.userInfo}>
            <Title style={styles.userName}>{user?.displayName || "User"}</Title>
            <Caption style={styles.userEmail}>{user?.email || "No email available"}</Caption>
          </View>
        </View>
      </Surface>

      <View style={styles.menuContainer}>
        <List.Section>
          <List.Item
            title="Personal Information"
            left={() => <List.Icon icon={({color}) => <User color="#FF475F" size={24} />} />}
            right={() => <ChevronRight color="#888" size={20} />}
            onPress={() => Linking.openURL(`https://myaccount.google.com/?authuser=${user?.email}`)}
            style={styles.menuItem}
          />
          <Divider />
          
          <List.Item
            title="My Favorites"
            left={() => <List.Icon icon={({color}) => <Star color="#FF475F" size={24} />} />}
            right={() => <ChevronRight color="#888" size={20} />}
            onPress={() => navigation.navigate("Favorite")}
            style={styles.menuItem}
          />
          <Divider />
          
          <List.Item
            title="Support"
            left={() => <List.Icon icon={({color}) => <HelpCircle color="#FF475F" size={24} />} />}
            right={() => <ChevronRight color="#888" size={20} />}
            onPress={() => alert("Support Page Coming Soon!")}
            style={styles.menuItem}
          />
          <Divider />
          
          <List.Item
            title="Settings"
            left={() => <List.Icon icon={({color}) => <Settings color="#FF475F" size={24} />} />}
            right={() => <ChevronRight color="#888" size={20} />}
            onPress={() => alert("Settings Page Coming Soon!")}
            style={styles.menuItem}
          />
          <Divider />
          
          <List.Item
            title="Logout"
            left={() => <List.Icon icon={({color}) => <LogOut color="#FF475F" size={24} />} />}
            onPress={handleLogout}
            style={styles.menuItem}
          />
        </List.Section>
      </View>
      
      <View style={styles.versionContainer}>
        <Caption style={styles.versionText}>CityScout v1.0.0</Caption>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#F5F5F5" 
  },
  headerContainer: {
    padding: 20,
    elevation: 4,
    backgroundColor: "#FFFFFF",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  userInfo: {
    marginLeft: 20,
  },
  userName: {
    fontSize: 20,
    fontWeight: "bold",
  },
  userEmail: {
    fontSize: 14,
    color: "#666",
  },
  menuContainer: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    marginTop: 20,
    marginHorizontal: 16,
    borderRadius: 12,
    paddingVertical: 8,
    elevation: 2,
  },
  menuItem: {
    paddingVertical: 8,
  },
  versionContainer: {
    alignItems: "center",
    paddingVertical: 20,
  },
  versionText: {
    color: "#888",
  },
});