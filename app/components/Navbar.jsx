import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, Image, StyleSheet } from "react-native";
import Home from "./Home";
import Fav from './Fav';
import GMap from './GMap';
import Blog from './Blog';

export default function Navbar() {
    const Tab = createBottomTabNavigator();
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused }) => {
                    let iconSource;

                    if (route.name === "Home") {
                        iconSource = focused
                            ? "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/1041db3a-ffe6-4070-b6f8-1b66eb90d058"
                            : "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/ee45001b-08af-45de-ba4e-1e3de5330d87";
                    } else if (route.name === "Map") {
                        iconSource = focused
                            ? "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/8a420761-95a9-4e0a-b837-cfca2304b5df"
                            : "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/55b95c3b-bf2d-42c1-95e3-97a8eda00b22";
                    } else if (route.name === "Favorite") {
                        iconSource = focused
                            ? "https://img.icons8.com/?size=100&id=7697&format=png&color=000000"
                            : "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/a7f41ec5-5961-40b6-917d-d03a75968bc8";
                    } else if (route.name === "Blog") {
                        iconSource = focused    
                            ? "https://img.icons8.com/?size=100&id=c7egG56HtNjc&format=png&color=000000"
                            : "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/16309532-7570-4f17-ac0c-f1fba39464e0";
                    }

                    return (
                        <View style={[styles.iconContainer, focused && styles.activeIconContainer]}>
                            <Image source={{ uri: iconSource }} style={[styles.icon, focused && styles.activeIcon]} />
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
            <Tab.Screen name="Blog" component={Blog} />
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
      tintColor: "#FFFFFF", // Makes sure the icon turns fully white
    },
    screen: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#F5F5F5",
    },
  });
  

