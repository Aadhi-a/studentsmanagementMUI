import { View, Text } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import SplashScreen from "@features/auth/SplashScreen";
import { navigationRef } from "@utils/NavigationUtills";
import LoginScreen from "@features/auth/LoginScreen";
import DemoScreen from "@screens/DemoScreen";
import Animatedtab from "@features/tabs/Animatedtab";

const Stack = createStackNavigator();

export default function Navigation() {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Demo" component={DemoScreen} />
        <Stack.Screen name="UserBottomTabs" component={Animatedtab} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
