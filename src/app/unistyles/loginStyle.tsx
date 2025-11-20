import { createStyleSheet } from "react-native-unistyles";

export const loginStyle = createStyleSheet(
  ({ fonts, colors, device, spacing }) => ({
    gradText: {
      flex: 1,
      justifyContent: "center",
    },
    container: {
      padding: spacing.xxl,
    },
    quoteContainer: {
      marginVertical: spacing.xxl * 1,
    },
    quoteTxt: {
      textAlign: "center",
      color: colors.primaryScale[400],
      textShadowColor: "#000",
      textShadowOffset: { width: 1, height: 0.5 },
      textShadowRadius: 1,
    },
  })
);
