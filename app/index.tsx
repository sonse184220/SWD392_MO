import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { NavigationIndependentTree } from "@react-navigation/native";
import Navbar from './components/Navbar';
import registerNNPushToken from 'native-notify';



export default function Index() {
  registerNNPushToken(27771, '8wm6XkyNOLVg4SuWcD35Iw');
  return (
    <NavigationIndependentTree>
      <NavigationContainer>
        <Navbar />
      </NavigationContainer>
    </NavigationIndependentTree>
  );
}


