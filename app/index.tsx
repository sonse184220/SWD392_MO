import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { NavigationIndependentTree } from "@react-navigation/native";
import { SafeAreaView } from "react-native";
import Navbar from './components/Navbar';
import registerNNPushToken from 'native-notify';
import { createStackNavigator } from "@react-navigation/stack";
import Login from './components/Login';
import AdminPage from './components/admin/AdminPage';
import Map from './components/CityDistrict/Map';

const Stack = createStackNavigator();
export default function Index() {
  registerNNPushToken(28377, 'Th8WOlG5eds2MxaDYrC6KT');
  return (
    
    <NavigationIndependentTree>
      <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="HomeTabs" component={Navbar} />
      </Stack.Navigator>
      </NavigationContainer>
    </NavigationIndependentTree>  
  );
}


