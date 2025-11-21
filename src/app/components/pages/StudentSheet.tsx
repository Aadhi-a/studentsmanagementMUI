import React from "react";
import { View, Text, StyleSheet } from "react-native";
import CheckBox from "react-native-check-box";

interface Student {
  id: number;
  name: string;
  isPresent: boolean | null;
}

interface StudentRowProps {
  student: Student;
  onMark: (id: number, present: boolean) => void;
}

const StudentSheet: React.FC<StudentRowProps> = ({ student, onMark }) => {
  return (
    <View style={styles.row}>
      <Text style={styles.name}>{student.name}</Text>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <CheckBox
          isChecked={student.isPresent === true}
          onClick={() => onMark(student.id, true)}
          rightText="Present"
          rightTextStyle={{
            color: student.isPresent === true ? "green" : "black",
            fontWeight: "bold",
          }}
          checkBoxColor={student.isPresent === true ? "green" : "#555"}
        />
        <CheckBox
          isChecked={student.isPresent === false}
          onClick={() => onMark(student.id, false)}
          rightText="Absent"
          rightTextStyle={{
            color: student.isPresent === false ? "red" : "black",
            fontWeight: "bold",
          }}
          checkBoxColor={student.isPresent === false ? "red" : "#555"}
        />
      </View>
    </View>
  );
};

export default StudentSheet;

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 10,
    marginVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  name: { fontSize: 16, flex: 1 },
});
