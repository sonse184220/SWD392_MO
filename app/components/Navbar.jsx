import React, { useState, useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, StyleSheet } from "react-native";
import { onAuthStateChanged } from "firebase/auth";
import { Icon } from "react-native-paper";
import Home from "./Home";
import Fav from "./Fav";
import GMap from "./GMap";
import { auth } from "./Firebase/FirebaseConfig"; 
import Profile from "./Profile";

export default function Navbar() {
  const Tab = createBottomTabNavigator();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, setUser);
    return () => unsubscribe();
  }, []);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused }) => {
          const icons = {
            Home: "home",
            Map: "map",
            Favorite: "heart",
            Profile: "account",
          };

          return (
            <View style={[styles.iconContainer, focused && styles.activeIconContainer]}>
              <Icon 
                source={icons[route.name]} 
                size={28} 
                color={focused ? "#FFFFFF" : "#666"} 
                style={focused && styles.activeIcon} 
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
  activeIcon: {
    opacity: 1,
  },
});

