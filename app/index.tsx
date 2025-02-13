import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { View, Image, StyleSheet } from "react-native";
import { NavigationIndependentTree } from "@react-navigation/native";
import Navbar from './components/Navbar';


export default function Index() {
  return (
    <NavigationIndependentTree>
      <NavigationContainer>
        <Navbar />
      </NavigationContainer>
    </NavigationIndependentTree>
  );
}


