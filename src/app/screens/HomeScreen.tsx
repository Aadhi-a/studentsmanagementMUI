import { View, Text, Alert, TouchableOpacity } from "react-native";
import React, { FC } from "react";
import { resetAndNavigate } from "@utils/NavigationUtills";
import { storage } from "@utils/mmkvStrorage";
import Icon from "@components/global/Icon";
import { Colors } from "@unistyles/constants";

const HomeScreen: FC = () => {
  const handleLogout = () => {
    Alert.alert("Confirm Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: () => {
          resetAndNavigate("Splash");
          storage.clearAll();
        },
      },
    ]);
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5f8f6",
      }}
    >
      <Text>HomeScreen</Text>
      <TouchableOpacity onPress={handleLogout}>
        <Icon name="mailFilled" size={26} color={Colors.accentDark} />
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;
