import { createStyleSheet } from "react-native-unistyles";

export const tableStyle = createStyleSheet(
  ({ fonts, colors, device, borderWidth }) => ({
    container: {},
    head: {
      height: 50,
      backgroundColor: colors.neutralMuted,
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
      // borderWidth: 1.5,
      // borderColor: colors.CloudDrift,
    },
    headText: {
      textAlign: "center",
      fontWeight: 700,
      color: colors.neutralDark,
      fontFamily: fonts.RobotoItalic,
    },
    row: (isFocused: boolean = false) => ({
      flexDirection: "row",
      height: 50,
      backgroundColor: isFocused ? colors.primaryScale[50] : colors.PureCanvas,
    }),
    text: {
      textAlign: "center",
      color: "#555",
      fontFamily: fonts.RobotoItalic,
      fontWeight: 500,
    },
    dropDown: {
      borderWidth: borderWidth.thin,
      borderColor: colors.secondaryDark,
      borderRadius: 5,
      paddingHorizontal: 6,
      height: 25,
      marginHorizontal: 10,
    },
    paginationContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      backgroundColor: colors.neutralMuted,
      borderBottomLeftRadius: 10,
      borderBottomRightRadius: 10,
      padding: 9,
    },
    pagination: {
      flexDirection: "row",
      justifyContent: "flex-end",
      alignItems: "center",
      position: "static",
    },
    pageNumber: {
      paddingHorizontal: 5,
      paddingVertical: 3,
      marginHorizontal: 2,
      borderWidth: borderWidth.thin,
      borderColor: "#4CAF50",
      borderRadius: 4,
    },
    activePage: {
      backgroundColor: "#4CAF50",
    },
    pageText: {
      color: colors.neutral,
      fontSize: 10,
      fontFamily: fonts.RobotoSlab,
    },
    activeText: {
      color: "#fff",
      fontSize: 13,
      fontFamily: fonts.RobotoSlab,
    },
    ellipsis: {
      borderWidth: 0,
      paddingHorizontal: 6,
      paddingVertical: 6,
      color: "#555",
      fontWeight: "bold",
    },
    navButton: {
      paddingHorizontal: 5,
      paddingVertical: 5,
      marginHorizontal: 4,
      borderWidth: borderWidth.thin,
      borderColor: "#4CAF50",
      borderRadius: 4,
    },
    disabledButton: {
      borderColor: colors.neutral,
    },
  })
);
