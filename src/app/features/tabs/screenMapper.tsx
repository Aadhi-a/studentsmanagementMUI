import MonthlyTodoScreen from "@components/demo/MonthlyTodoScreen";
import ChatsScreen from "@screens/ChatsScreen";
import DemoScreen from "@screens/DemoScreen";
import HomeScreen from "@screens/HomeScreen";
import ProfileScreen from "@screens/ProfileScreen";
import AttananceScreen from "@screens/students/AttananceScreen";
import StudentsProfileScreen from "@screens/students/StudentsProfileScreen";

export const screenMapper: { [key: string]: React.ComponentType<any> } = {
  HomeScreen: HomeScreen,
  DemoScreen: DemoScreen,
  AttananceScreen: AttananceScreen,
  ProfileScreen: ProfileScreen,
  ChatsScreen: ChatsScreen,
  StudentsProfile: StudentsProfileScreen,
  MonthlyTodoScreen: MonthlyTodoScreen,
};
