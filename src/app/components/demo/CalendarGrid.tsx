import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import dayjs, { Dayjs } from "dayjs";

type Task = { id: number; text: string; done: boolean };
type TaskMap = { [date: string]: Task[] };

type Props = {
  month: Dayjs;
  selectedDate: Dayjs;
  onSelectDate: (d: Dayjs) => void;
  tasks: TaskMap;
};

export default function CalendarGrid({
  month,
  selectedDate,
  onSelectDate,
  tasks,
}: Props) {
  const start = month.startOf("month").startOf("week");
  const end = month.endOf("month").endOf("week");

  const days = [];
  let day = start;

  while (day.isBefore(end) || day.isSame(end)) {
    days.push(day);
    day = day.add(1, "day");
  }

  return (
    <View style={styles.grid}>
      {days.map((d, idx) => {
        const isSelected = d.isSame(selectedDate, "day");
        const hasTasks = (tasks[d.format("YYYY-MM-DD")] || []).length > 0;

        return (
          <TouchableOpacity
            key={idx}
            style={[styles.dayBox, isSelected && styles.selected]}
            onPress={() => onSelectDate(d)}
          >
            <Text style={isSelected ? styles.selectedText : styles.dayText}>
              {d.date()}
            </Text>

            {hasTasks && <View style={styles.dot} />}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 8,
  },
  dayBox: {
    width: "14.28%",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 4,
  },
  dayText: {
    fontSize: 16,
  },
  selected: {
    backgroundColor: "#007AFF33",
    borderRadius: 8,
  },
  selectedText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#007AFF",
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#007AFF",
    marginTop: 3,
  },
});
