import { createStyleSheet } from "react-native-unistyles";

export const LoaderAnimeStyle = createStyleSheet(
  ({ fonts, colors, device }) => ({
    container: {
      flex: 1,
      backgroundColor: colors.accentDark,
      justifyContent: "center",
      alignItems: "center",
    },
    spinner: {
      position: "absolute",
      width: 120,
      height: 120,
      justifyContent: "center",
      alignItems: "center",
    },
    ring: {
      width: 100,
      height: 100,
      borderRadius: 50,
      borderWidth: 4,
      borderTopColor: "#3498db",
      borderRightColor: "transparent",
      borderBottomColor: "transparent",
      borderLeftColor: "transparent",
      justifyContent: "center",
      alignItems: "center",
    },
    logoWrapper: {
      justifyContent: "center",
      alignItems: "center",
      width: 80,
      height: 80,
      borderRadius: 40,
      overflow: "hidden",
      // backgroundColor: '#fff',
    },
    logo: {
      width: 40,
      height: 40,
      resizeMode: "contain",
    },
  })
);
