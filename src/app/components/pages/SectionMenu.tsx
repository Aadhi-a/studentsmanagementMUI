import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import React, { FC } from "react";
import { navigate } from "@utils/NavigationUtills";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import StyledText from "@components/global/StylesText";

interface HomeMenuItemProps {
  title: string;
  img: any;
  router: string;
}

const SectionMenu: React.FC<HomeMenuItemProps> = ({ title, img, router }) => {
  const { styles } = useStyles(SectionMenuStyle);
  return (
    <View style={styles.menuItem}>
      <TouchableOpacity
        style={{ alignItems: "center" }}
        onPress={() => navigate(router as never)}
      >
        <Image source={img} style={styles.menuImage} />
        <StyledText
          variant="h6"
          fontFamily="HiMelodyRegular"
          style={{ textAlign: "center" }}
        >
          {title}
        </StyledText>
      </TouchableOpacity>
    </View>
  );
};

export default SectionMenu;

const SectionMenuStyle = createStyleSheet(
  ({ fonts, colors, device, fontSize }) => ({
    menuItem: {
      width: device.wp(28),
      height: device.hp(14),
      alignItems: "center",
      margin: 10,
      padding: 10,
      borderWidth: 1,
      borderColor: colors.neutral,
      borderRadius: 10,
      backgroundColor: colors.CloudDrift,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 4,
    },
    menuImage: {
      width: 90,
      height: 70,
      marginBottom: 5,
      resizeMode: "contain",
    },
  })
);
