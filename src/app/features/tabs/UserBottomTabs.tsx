import React, { useEffect, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, ActivityIndicator } from "react-native";
import HomeScreen from "@screens/HomeScreen";
import CustomTabBar from "./CustomTabbar";
import { getStorage } from "@utils/mmkvStrorage";
import { roleMenus } from "./RoleMenus";
import { screenMapper } from "./screenMapper";
import { resetAndNavigate } from "@utils/NavigationUtills";
import LoaderAnimation from "@components/pages/LoaderAnimation";
import ProfileScreen from "@screens/ProfileScreen";
import ChatsScreen from "@screens/ChatsScreen";

interface MenuItem {
  name: string;
  screen: string;
}

const Tab = createBottomTabNavigator();

const UserBottomTabs: React.FC<{}> = () => {
  const [loading, setLoading] = useState(false);
  // const [menus, setMenus] = useState<MenuItem[]>([]);
  const [userRole, setUserRole] = useState<string | null>(null);
  // useEffect(() => {
  //   try {
  //     const userStr = getStorage("User"); // string
  //     console.log("userStorage Raw:", userStr);

  //     if (!userStr) {
  //       console.log("No user in storage");
  //       return;
  //     }

  //     const parsed = JSON.parse(userStr);
  //     console.log("Parsed User:", parsed);

  //     // 🎯 Role-based bottom menu selection using switch
  //     switch (true) {
  //       case parsed.isAdmin === 1:
  //         setMenus(roleMenus.admin);
  //         break;

  //       case parsed.isTeacher === 1:
  //         setMenus(roleMenus.teacher);
  //         break;

  //       case parsed.isStudent === 1:
  //         setMenus(roleMenus.student);
  //         break;

  //       case parsed.isParent === 1:
  //         setMenus(roleMenus.parent);
  //         break;

  //       default:
  //         resetAndNavigate("ErrorScreen");
  //         break;
  //     }
  //   } catch (error) {
  //     console.log("Error parsing user:", error);
  //   }
  // }, []);

  useEffect(() => {
    const userStr = getStorage("User");
    if (!userStr) return;
    const parsed = JSON.parse(userStr);

    if (parsed.isAdmin === 1) setUserRole("admin");
    else if (parsed.isTeacher === 1) setUserRole("teacher");
    else if (parsed.isStudent === 1) setUserRole("student");
    else if (parsed.isParent === 1) setUserRole("parent");
  }, []);
  const handleTabPress = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  return (
    <View style={{ flex: 1 }}>
      <Tab.Navigator
        tabBar={(props) => (!loading ? <CustomTabBar {...props} /> : null)}
        screenOptions={{
          headerShown: false,
          tabBarHideOnKeyboard: true,
          animation: "fade",
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          listeners={{ tabPress: handleTabPress }}
        />
        {(userRole === "teacher" || userRole === "parent") && (
          <Tab.Screen
            name="Chat"
            component={ChatsScreen}
            listeners={{ tabPress: handleTabPress }}
          />
        )}
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          listeners={{ tabPress: handleTabPress }}
        />
      </Tab.Navigator>
      {loading && (
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "#fff",
          }}
        >
          <LoaderAnimation />
        </View>
      )}
    </View>
  );
};
export default UserBottomTabs;
