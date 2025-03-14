import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { NavigationIndependentTree } from "@react-navigation/native";
import Navbar from './components/Navbar';
import registerNNPushToken from 'native-notify';
import { createStackNavigator } from "@react-navigation/stack";
import Login from './components/Login';
import Test from './Service/Test';
import District from './components/CityDistrict/District';
import City from './components/CityDistrict/City';


const Stack = createStackNavigator();
export default function Index() {
  registerNNPushToken(27771, '8wm6XkyNOLVg4SuWcD35Iw');
  return (
    // <NavigationIndependentTree>
    //   <NavigationContainer>
    //   <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
    //     <Stack.Screen name="Login" component={Login} />
    //     <Stack.Screen name="HomeTabs" component={Navbar} />
    //   </Stack.Navigator>
    //   </NavigationContainer>
    // </NavigationIndependentTree>
      <Test/>
  );
}


