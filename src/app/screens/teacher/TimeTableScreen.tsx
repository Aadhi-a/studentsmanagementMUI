import { View, Text } from "react-native";
import React, { FC } from "react";
import TeacherCalendarScreen from "@components/pages/TeacherTimetableScreen";

const TimeTableScreen: FC = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 100,
      }}
    >
      <Text>TimeTableScreen</Text>
      <TeacherCalendarScreen />
    </View>
  );
};

export default TimeTableScreen;
