import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
import dayjs, { Dayjs } from "dayjs";

type Task = { id: number; text: string; done: boolean };

type Props = {
  date: Dayjs;
  tasks: Task[];
  addTask: (text: string) => void;
  toggleTask: (id: number) => void;
};

export default function TaskList({ date, tasks, addTask, toggleTask }: Props) {
  const [text, setText] = useState("");

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Tasks for {date.format("DD MMM YYYY")}</Text>

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id.toString()}
        style={{ maxHeight: 250 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.taskRow}
            onPress={() => toggleTask(item.id)}
          >
            <Text style={item.done ? styles.doneText : styles.taskText}>
              {item.text}
            </Text>
          </TouchableOpacity>
        )}
      />

      <View style={styles.inputRow}>
        <TextInput
          value={text}
          onChangeText={setText}
          placeholder="Add task..."
          style={styles.input}
        />

        <TouchableOpacity
          style={styles.addButton}
          onPress={() => {
            if (text.trim().length > 0) {
              addTask(text);
              setText("");
            }
          }}
        >
          <Text style={styles.addText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  header: { fontSize: 18, fontWeight: "600", marginBottom: 10 },
  taskRow: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  taskText: { fontSize: 16 },
  doneText: {
    fontSize: 16,
    textDecorationLine: "line-through",
    opacity: 0.6,
  },
  inputRow: {
    flexDirection: "row",
    marginTop: 12,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#bbb",
    borderRadius: 8,
    padding: 10,
  },
  addButton: {
    width: 48,
    height: 48,
    backgroundColor: "#007AFF",
    borderRadius: 8,
    marginLeft: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  addText: {
    color: "white",
    fontSize: 28,
    fontWeight: "bold",
  },
});
