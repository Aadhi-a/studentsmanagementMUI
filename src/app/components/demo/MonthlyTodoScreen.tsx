import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import dayjs, { Dayjs } from "dayjs";
import CalendarGrid from "./CalendarGrid";
import TaskList from "./TaskList";
import MonthHeader from "./ MonthHeader";

type Task = {
  id: number;
  text: string;
  done: boolean;
};

type TaskMap = {
  [date: string]: Task[];
};

export default function MonthlyTodoScreen() {
  const [currentMonth, setCurrentMonth] = useState<Dayjs>(dayjs());
  const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs());
  const [tasks, setTasks] = useState<TaskMap>({});

  const key = selectedDate.format("YYYY-MM-DD");

  const addTask = (text: string) => {
    setTasks((prev) => ({
      ...prev,
      [key]: [...(prev[key] || []), { id: Date.now(), text, done: false }],
    }));
  };

  const toggleTask = (id: number) => {
    setTasks((prev) => ({
      ...prev,
      [key]: (prev[key] || []).map((t) =>
        t.id === id ? { ...t, done: !t.done } : t
      ),
    }));
  };

  return (
    <View style={styles.container}>
      <MonthHeader
        month={currentMonth}
        onPrev={() => setCurrentMonth(currentMonth.subtract(1, "month"))}
        onNext={() => setCurrentMonth(currentMonth.add(1, "month"))}
      />

      <CalendarGrid
        month={currentMonth}
        selectedDate={selectedDate}
        onSelectDate={setSelectedDate}
        tasks={tasks}
      />

      <TaskList
        date={selectedDate}
        tasks={tasks[key] || []}
        addTask={addTask}
        toggleTask={toggleTask}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 40 },
});
