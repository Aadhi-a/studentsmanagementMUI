import { View, Text } from "react-native";
import React from "react";
import UserBottomTabs from "./UserBottomTabs";
import { SharedStateprovider } from "./SharedContext";

export default function Animatedtab() {
  return (
    <SharedStateprovider>
      <UserBottomTabs />
    </SharedStateprovider>
  );
}
