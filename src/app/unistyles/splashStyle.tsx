import { createStyleSheet } from "react-native-unistyles";

export const splashStyle = createStyleSheet(
  ({ fonts, colors, device, spacing }) => ({
    mainContainer: {
      flex: 1,
      backgroundColor: colors.accentDark,
      justifyContent: "center",
      alignItems: "center",
    },
    logo: {
      width: device.wp(100),
      height: device.hp(10),
      marginBottom: spacing.xxl,
    },
    createText: {
      textAlign: "center",
      letterSpacing: 2,
      fontWeight: 600,
      color: "#efefef",
    },
    bottomContainer: {
      position: "absolute",
      bottom: spacing.xl,
    },
    bottomText: {
      letterSpacing: 1,
      color: colors.secondaryDark,
      fontWeight: 800,
    },
  })
);
