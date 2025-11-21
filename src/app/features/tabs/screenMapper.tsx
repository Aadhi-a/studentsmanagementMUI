import DemoScreen from "@screens/DemoScreen";
import HomeScreen from "@screens/HomeScreen";
import AttananceScreen from "@screens/students/AttananceScreen";

export const screenMapper: { [key: string]: React.ComponentType<any> } = {
  HomeScreen: HomeScreen,
  DemoScreen: DemoScreen,
  // TeacherScreen: TeacherScreen,
  AttananceScreen: AttananceScreen,
  // ParentScreen: ParentScreen,
  // ExamScreen: ExamScreen,
};
