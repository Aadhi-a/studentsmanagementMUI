import { View, Text } from "react-native";
import React from "react";
import StyledText from "@components/global/StylesText";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import Navigation from "@navigation/Navigation";
import "@unistyles/unistyle";

export default function App() {
  return (
    // <Provider store={store}>
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <Navigation />
      </BottomSheetModalProvider>
      {/* <Toast config={toastConfig} /> */}
    </GestureHandlerRootView>
    // </Provider>
  );
}
