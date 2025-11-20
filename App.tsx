import { View, Text } from "react-native";
import React from "react";
import StyledText from "@components/global/StylesText";

export default function App() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>App</Text>
      <StyledText variant="h1" color="red" fontFamily="HiMelodyRegular">
        Welcome Back !
      </StyledText>
    </View>
  );
}
