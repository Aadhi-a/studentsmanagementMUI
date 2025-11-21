import React from "react";
import { View, StyleSheet, Alert } from "react-native";
import { Calendar } from "react-native-big-calendar";

// STRICT DAY TYPE (Fix for TS index error)
type WeekDay =
  | "Sunday"
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday";

// Timetable slot structure
interface TimetableSlot {
  day: WeekDay;
  startTime: string;
  endTime: string;
  className: string;
  subject: string;
}

// 4 classes per day – different times
const teacherTimetable: TimetableSlot[] = [
  {
    day: "Monday",
    startTime: "09:00",
    endTime: "09:45",
    className: "Class A",
    subject: "Math",
  },
  {
    day: "Monday",
    startTime: "10:00",
    endTime: "10:45",
    className: "Class B",
    subject: "Math",
  },
  {
    day: "Monday",
    startTime: "11:00",
    endTime: "11:45",
    className: "Class C",
    subject: "Math",
  },
  {
    day: "Monday",
    startTime: "12:00",
    endTime: "12:45",
    className: "Class D",
    subject: "Math",
  },

  {
    day: "Tuesday",
    startTime: "08:30",
    endTime: "09:15",
    className: "Class A",
    subject: "Math",
  },
  {
    day: "Tuesday",
    startTime: "09:30",
    endTime: "10:15",
    className: "Class C",
    subject: "Math",
  },
  {
    day: "Tuesday",
    startTime: "10:30",
    endTime: "11:15",
    className: "Class D",
    subject: "Math",
  },
  {
    day: "Tuesday",
    startTime: "11:30",
    endTime: "12:15",
    className: "Class B",
    subject: "Math",
  },

  {
    day: "Wednesday",
    startTime: "09:00",
    endTime: "09:45",
    className: "Class B",
    subject: "Math",
  },
  {
    day: "Wednesday",
    startTime: "10:00",
    endTime: "10:45",
    className: "Class C",
    subject: "Math",
  },
  {
    day: "Wednesday",
    startTime: "11:00",
    endTime: "11:45",
    className: "Class D",
    subject: "Math",
  },
  {
    day: "Wednesday",
    startTime: "12:00",
    endTime: "12:45",
    className: "Class A",
    subject: "Math",
  },

  {
    day: "Thursday",
    startTime: "08:45",
    endTime: "09:30",
    className: "Class D",
    subject: "Math",
  },
  {
    day: "Thursday",
    startTime: "09:45",
    endTime: "10:30",
    className: "Class A",
    subject: "Math",
  },
  {
    day: "Thursday",
    startTime: "10:45",
    endTime: "11:30",
    className: "Class B",
    subject: "Math",
  },
  {
    day: "Thursday",
    startTime: "11:45",
    endTime: "12:30",
    className: "Class C",
    subject: "Math",
  },

  {
    day: "Friday",
    startTime: "09:00",
    endTime: "09:40",
    className: "Class C",
    subject: "Math",
  },
  {
    day: "Friday",
    startTime: "09:50",
    endTime: "10:30",
    className: "Class A",
    subject: "Math",
  },
  {
    day: "Friday",
    startTime: "10:40",
    endTime: "11:20",
    className: "Class B",
    subject: "Math",
  },
  {
    day: "Friday",
    startTime: "11:30",
    endTime: "12:10",
    className: "Class D",
    subject: "Math",
  },
];

// Weekday → index
const weekDaysMap: Record<WeekDay, number> = {
  Sunday: 0,
  Monday: 1,
  Tuesday: 2,
  Wednesday: 3,
  Thursday: 4,
  Friday: 5,
  Saturday: 6,
};

// Calendar event type
interface MyEvent {
  title: string;
  start: Date;
  end: Date;
  slot?: TimetableSlot;
}

// Convert timetable → calendar events
const getEvents = (): MyEvent[] => {
  const today = new Date();

  return teacherTimetable.map((slot) => {
    const dayDiff = (weekDaysMap[slot.day] - today.getDay() + 7) % 7;

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

    return {
      title: `${slot.className} (${slot.subject})`,
      start,
      end,
      slot,
    };
  });
};

const TeacherCalendarScreen = () => {
  const events = getEvents();

  const onPressEvent = (event: MyEvent) => {
    Alert.alert("Attendance", `Open attendance for ${event.title}?`);
  };

  return (
    <View style={styles.container}>
      <Calendar
        events={events}
        mode="schedule"
        height={750}
        showTime
        minHour={8} // instead of dayStartHour
        maxHour={17} // instead of dayEndHour
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
});
