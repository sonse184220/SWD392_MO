import React from "react";
import { SafeAreaView, View, Image, Text, ImageBackground, StyleSheet } from "react-native";

export default function Profile() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image source={{ uri: "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/10ce0c4e-e191-4fba-ae06-d33d5e0e7626" }} style={styles.icon} />
        <Text style={styles.title}>Profile</Text>
      </View>
      <ImageBackground source={{ uri: "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/be8420f4-0cc5-404e-9e37-3bea0874ff00" }} style={styles.avatar}>
        <Text style={styles.avatarText}>H</Text>
      </ImageBackground>
      <Text style={styles.name}>Heba Qaisar</Text>
      <View style={styles.menu}>
        {menuItems.map((item, index) => (
          <View key={index} style={styles.menuItem}>
            <Image source={{ uri: item.icon }} style={styles.menuIcon} />
            <Text style={styles.menuText}>{item.label}</Text>
          </View>
        ))}
      </View>
      <Text style={styles.logout}>Logout</Text>
    </SafeAreaView>
  );
}

const menuItems = [
  { label: "Support", icon: "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/c92878d9-6e03-4f47-81e7-d00273d88920" },
  { label: "Settings", icon: "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/a2792ce9-3047-48c7-b108-4742542fcc56" },
  { label: "Personal Information", icon: "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/c33b1b8c-fdcb-429c-bbd6-8da2a2bdbf8b" }
];

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#FFF" },
  header: { flexDirection: "row", alignItems: "center", marginBottom: 20 },
  icon: { width: 24, height: 24, marginRight: 10 },
  title: { fontSize: 22, fontWeight: "bold" },
  avatar: { width: 100, height: 100, justifyContent: "center", alignItems: "center", borderRadius: 50, overflow: "hidden" },
  avatarText: { fontSize: 40, fontWeight: "bold" },
  name: { fontSize: 20, fontWeight: "bold", marginVertical: 10 },
  menu: { width: "80%" },
  menuItem: { flexDirection: "row", alignItems: "center", paddingVertical: 10 },
  menuIcon: { width: 24, height: 24, marginRight: 10 },
  menuText: { fontSize: 16 },
  logout: { fontSize: 16, color: "red", marginTop: 20 }
});