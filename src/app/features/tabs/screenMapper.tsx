import ChatsScreen from "@screens/ChatsScreen";
import DemoScreen from "@screens/DemoScreen";
import HomeScreen from "@screens/HomeScreen";
import ProfileScreen from "@screens/ProfileScreen";
import AttananceScreen from "@screens/students/AttananceScreen";

export const screenMapper: { [key: string]: React.ComponentType<any> } = {
  HomeScreen: HomeScreen,
  DemoScreen: DemoScreen,
  AttananceScreen: AttananceScreen,
  ProfileScreen: ProfileScreen,
  ChatsScreen: ChatsScreen,
};
