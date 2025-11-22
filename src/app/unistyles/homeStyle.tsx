import { createStyleSheet } from "react-native-unistyles";

export const homeStyle = createStyleSheet(
  ({ fonts, colors, device, spacing, borderRadius, borderWidth }) => ({
    container: {
      flex: 1,
      backgroundColor: colors.neutral,
    },
    headerBase: {
      backgroundColor: colors.neutral,
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      zIndex: 50,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 4,
    },
    headerContent: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: spacing.xxl,
    },
    content: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    logo: {
      width: device.hp(5),
      height: device.wp(11),
      borderWidth: borderWidth.thin,
      marginRight: 20,
      borderRadius: borderRadius.round,
      padding: 3,
    },

    adsContainer: {
      marginBottom: spacing.xl,
    },
    menusCont: {
      paddingHorizontal: spacing.xl,
      marginTop: 150,
    },
  })
);
