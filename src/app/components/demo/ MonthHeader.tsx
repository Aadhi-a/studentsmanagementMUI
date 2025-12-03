import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import dayjs, { Dayjs } from "dayjs";

type Props = {
  month: Dayjs;
  onPrev: () => void;
  onNext: () => void;
};

export default function MonthHeader({ month, onPrev, onNext }: Props) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPrev}>
        <Text style={styles.nav}>{"<"}</Text>
      </TouchableOpacity>

      <Text style={styles.title}>{month.format("MMMM YYYY")}</Text>

      <TouchableOpacity onPress={onNext}>
        <Text style={styles.nav}>{">"}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
  },
  nav: {
    fontSize: 22,
    paddingHorizontal: 16,
  },
});
