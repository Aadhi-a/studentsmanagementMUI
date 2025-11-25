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

interface MenuItem {
  name: string;
  screen: string;
}

const Tab = createBottomTabNavigator();

const UserBottomTabs: React.FC<{}> = () => {
  const [loading, setLoading] = useState(false);
  const [menus, setMenus] = useState<MenuItem[]>([]);

  useEffect(() => {
    try {
      const userStr = getStorage("User"); // string
      console.log("userStorage Raw:", userStr);

      if (!userStr) {
        console.log("No user in storage");
        return;
      }

      const parsed = JSON.parse(userStr);
      console.log("Parsed User:", parsed);

      // 🎯 Role-based bottom menu selection using switch
      switch (true) {
        case parsed.isAdmin === 1:
          setMenus(roleMenus.admin);
          break;

        case parsed.isTeacher === 1:
          setMenus(roleMenus.teacher);
          break;

        case parsed.isStudent === 1:
          setMenus(roleMenus.student);
          break;

        case parsed.isParent === 1:
          setMenus(roleMenus.parent);
          break;

        default:
          resetAndNavigate("ErrorScreen");
          break;
      }
    } catch (error) {
      console.log("Error parsing user:", error);
    }
  }, []);

  const handleTabPress = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  if (!menus.length) return null;

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
        {menus.map((item) => (
          <Tab.Screen
            key={item.name}
            name={item.name}
            component={screenMapper[item.screen]}
            listeners={{ tabPress: handleTabPress }}
          />
        ))}
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
