import { View, Text, TouchableOpacity } from "react-native";
import React, { FC } from "react";
import Icon from "@components/global/Icon";
import { Colors } from "@unistyles/constants";
import { goBack } from "@utils/NavigationUtills";

const ProfileScreen: FC = () => {
  const handleProfile = () => {
    goBack();
  };

  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <TouchableOpacity onPress={() => goBack()}>
        <Icon
          name="powerOff"
          size={26}
          color={Colors.errorDark}
          strokeWidth={2}
        />
      </TouchableOpacity>
      <Text>ProfileScreen</Text>
    </View>
  );
};

export default ProfileScreen;
