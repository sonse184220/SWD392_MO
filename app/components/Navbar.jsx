import React, { useState, useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, Image, StyleSheet } from "react-native";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Home from "./Home";
import Fav from "./Fav";
import GMap from "./GMap";
import Blog from "./Blog";
import Profile from "./Profile";

export default function Navbar() {
  const Tab = createBottomTabNavigator();
  const [user, setUser] = useState(null);
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, setUser);
    return () => unsubscribe(); // Cleanup listener
  }, []);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          const icons = {
            Home: focused
              ? "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/1041db3a-ffe6-4070-b6f8-1b66eb90d058"
              : "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/ee45001b-08af-45de-ba4e-1e3de5330d87",
            Map: focused
              ? "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/8a420761-95a9-4e0a-b837-cfca2304b5df"
              : "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/55b95c3b-bf2d-42c1-95e3-97a8eda00b22",
            Favorite: focused
              ? "https://img.icons8.com/?size=100&id=7697&format=png&color=000000"
              : "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/a7f41ec5-5961-40b6-917d-d03a75968bc8",
            Profile: user?.photoURL || "https://via.placeholder.com/150",
          };

          return (
            <View style={[styles.iconContainer, focused && styles.activeIconContainer]}>
              <Image
                source={{ uri: icons[route.name] }}
                style={[styles.icon, focused && styles.activeIcon]}
              />
            </View>
          );
        },
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBar,
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Map" component={GMap} />
      <Tab.Screen name="Favorite" component={Fav} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    height: 60,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: "#1C1C1C1A",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 30,
    elevation: 10,
  },
  iconContainer: {
    width: 60,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  activeIconContainer: {
    backgroundColor: "#E81948",
  },
  icon: {
    width: 28,
    height: 28,
    opacity: 0.6,
  },
  activeIcon: {
    opacity: 1,
    tintColor: "#FFFFFF",
  },
});
