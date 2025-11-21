import DemoScreen from "@screens/DemoScreen";
import HomeScreen from "@screens/HomeScreen";

export const screenMapper: { [key: string]: React.ComponentType<any> } = {
  HomeScreen: HomeScreen,
  DemoScreen: DemoScreen,
  // TeacherScreen: TeacherScreen,
  // StudentScreen: StudentScreen,
  // ParentScreen: ParentScreen,
  // ExamScreen: ExamScreen,
};
