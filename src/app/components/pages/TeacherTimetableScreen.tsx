import { teacherTimetable } from "@assets/data/mockdata";
import { TimetableSlot, WeekDay } from "@utils/types/authType";
import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Text,
  ScrollView,
} from "react-native";
import { Calendar } from "react-native-big-calendar";

const weekDaysMap: Record<WeekDay, number> = {
  Sunday: 0,
  Monday: 1,
  Tuesday: 2,
  Wednesday: 3,
  Thursday: 4,
  Friday: 5,
  Saturday: 6,
};

interface MyEvent {
  title: string;
  start: Date;
  end: Date;
  slot?: TimetableSlot;
}

const getEvents = (): MyEvent[] => {
  const today = new Date();
  return teacherTimetable.map((slot) => {
    const dayDiff = (weekDaysMap[slot.day as WeekDay] - today.getDay() + 7) % 7;
    const eventDate = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() + dayDiff
    );
    const [sh, sm] = slot.startTime.split(":").map(Number);
    const [eh, em] = slot.endTime.split(":").map(Number);

    const start = new Date(eventDate);
    start.setHours(sh, sm, 0, 0);

    const end = new Date(eventDate);
    end.setHours(eh, em, 0, 0);

    return { title: `${slot.className} (${slot.subject})`, start, end, slot };
  });
};

const TeacherCalendarScreen = () => {
  const allEvents = getEvents();
  const [selectedClass, setSelectedClass] = useState<string>("All");

  const classes = ["All", "Class A", "Class B", "Class C", "Class D"];
  const filteredEvents =
    selectedClass === "All"
      ? allEvents
      : allEvents.filter((e) => e.slot?.className === selectedClass);

  const onPressEvent = (event: MyEvent) => {
    Alert.alert("Attendance", `Open attendance for ${event.title}?`);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.tabContainer}
      >
        {classes.map((cls) => (
          <TouchableOpacity
            key={cls}
            style={[
              styles.tabButton,
              selectedClass === cls && styles.tabButtonActive,
            ]}
            onPress={() => setSelectedClass(cls)}
          >
            <Text
              style={[
                styles.tabText,
                selectedClass === cls && styles.tabTextActive,
              ]}
            >
              {cls}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <Calendar
        events={filteredEvents}
        mode="schedule"
        height={700}
        showTime
        minHour={8}
        maxHour={17}
        headerContainerStyle={{
          backgroundColor: "#e8f0fe",
          paddingVertical: 10,
        }}
        eventCellStyle={{
          backgroundColor: "#1a73e8",
          borderRadius: 10,
        }}
        onPressEvent={onPressEvent}
      />
    </View>
  );
};

export default TeacherCalendarScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  tabContainer: {
    flexDirection: "row",
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  tabButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginHorizontal: 5,
    borderRadius: 20,
    backgroundColor: "#f1f3f4",
  },
  tabButtonActive: { backgroundColor: "#1a73e8" },
  tabText: { color: "#000", fontWeight: "500" },
  tabTextActive: { color: "#fff" },
});
