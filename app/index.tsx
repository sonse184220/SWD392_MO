import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { NavigationIndependentTree } from "@react-navigation/native";
import { SafeAreaView } from "react-native";
import Navbar from './components/Navbar';
import registerNNPushToken from 'native-notify';
import { createStackNavigator } from "@react-navigation/stack";
import Login from './components/Login';
import Test from './Service/Test';
import District from './components/CityDistrict/District';
import Map from './components/CityDistrict/Map';
import NotificationButton from './Notification/Noti';


const Stack = createStackNavigator();
export default function Index() {
  
  return (
    
    // <NavigationIndependentTree>
    //   <NavigationContainer>
    //   <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
    //     <Stack.Screen name="Login" component={Login} />
    //     <Stack.Screen name="HomeTabs" component={Navbar} />
    //   </Stack.Navigator>
    //   </NavigationContainer>
    // </NavigationIndependentTree>
    <NotificationButton/>
  );
}


