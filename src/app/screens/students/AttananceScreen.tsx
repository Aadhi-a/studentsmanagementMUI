import StudentSheet from "@components/pages/StudentSheet";
import React, { useState } from "react";
import { View, Text, FlatList, StyleSheet, Alert } from "react-native";
interface Student {
  id: number;
  name: string;
  isPresent: boolean | null;
}

const mockStudents: Student[] = Array.from({ length: 100 }, (_, i) => ({
  id: i + 100,
  name: `Student ${i + 100}`,
  isPresent: null,
}));

const AttendanceScreen = () => {
  const [students, setStudents] = useState<Student[]>(mockStudents);

  const currentDate = new Date().toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const markAttendance = (id: number, present: boolean) => {
    setStudents((prev) =>
      prev.map((student) =>
        student.id === id ? { ...student, isPresent: present } : student
      )
    );
  };

  const saveAttendance = () => {
    console.log("Saved Attendance:", students);
    Alert.alert("Success", "Attendance saved successfully!");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.date}>{currentDate}</Text>
      <Text style={styles.title}>Attendance</Text>
      <FlatList
        data={students}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <StudentSheet student={item} onMark={markAttendance} />
        )}
        contentContainerStyle={{ paddingBottom: 80 }}
      />
    </View>
  );
};

export default AttendanceScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#f5f5f5" },
  date: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
    textAlign: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
});
