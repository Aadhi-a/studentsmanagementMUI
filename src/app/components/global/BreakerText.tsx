import React, { FC } from "react";
import { View, StyleSheet } from "react-native";
import { Colors } from "@unistyles/constants";
import StyledText from "./StylesText";

const BreakerText: FC<{ text: string }> = ({ text }) => {
  return (
    <View style={styles.container}>
      <View style={styles.horizontalLine} />
      <StyledText
        fontSize={12}
        fontFamily="HiMelodyRegular"
        style={styles.breakerText}
      >
        {text}
      </StyledText>
      <View style={styles.horizontalLine} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
    paddingHorizontal: 20,
  },
  horizontalLine: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.primary,
  },
  breakerText: {
    fontSize: 20,
    marginHorizontal: 10,
    color: Colors.primary,
  },
});

export default BreakerText;
