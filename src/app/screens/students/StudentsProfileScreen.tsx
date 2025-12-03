import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  interpolate,
  Extrapolate,
} from "react-native-reanimated";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import { Colors } from "@unistyles/constants";
import { getStorage, storage } from "@utils/mmkvStrorage";
import { UserType } from "@utils/types/authType";
import StyledText from "@components/global/StylesText";
import { navigate, resetAndNavigate } from "@utils/NavigationUtills";
import Icon from "@components/global/Icon";

const Tab = createMaterialTopTabNavigator();

// Dummy tab content
const TabContent = ({ tabName }: { tabName: string }) => {
  return (
    <FlatList
      data={Array.from({ length: 20 })}
      keyExtractor={(_, index) => index.toString()}
      renderItem={({ index }) => (
        <View
          style={{
            height: 100,
            margin: 8,
            backgroundColor: Colors.neutralDark,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 8,
          }}
        >
          <Text>
            {tabName} Item {index + 1}
          </Text>
        </View>
      )}
    />
  );
};

const StudentsProfileScreen = () => {
  const insets = useSafeAreaInsets();
  const [user, setUser] = useState<UserType | null>(null);
  const lastOffsetY = useSharedValue(0);
  const scrollY = useSharedValue(0);

  const HEADER_HEIGHT = 60;
  const TOTAL_HEADER_HEIGHT = HEADER_HEIGHT + insets.top;

  useEffect(() => {
    const userObj = getStorage("User");
    if (userObj) {
      const parsed = JSON.parse(userObj);
      setUser(parsed);
    }
  }, []);

  // Header animation
  const animatedHeader = useAnimatedStyle(() => {
    const shadowOpacity = interpolate(
      lastOffsetY.value,
      [0, 20],
      [0, 0.25],
      Extrapolate.CLAMP
    );
    const elevation = interpolate(
      lastOffsetY.value,
      [0, 20],
      [0, 6],
      Extrapolate.CLAMP
    );

    return {
      shadowOpacity,
      elevation,
    };
  });

  const handleLogout = () => {
    storage.clearAll();
    resetAndNavigate("Splash");
  };

  const handleProfile = () => {
    navigate("Profile");
  };

  return (
    <View style={{ flex: 1 }}>
      {/* Sticky Header */}
      <Animated.View
        style={[
          {
            height: TOTAL_HEADER_HEIGHT,
            backgroundColor: Colors.CloudDrift,
            justifyContent: "center",
            paddingHorizontal: 16,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowRadius: 4,
            zIndex: 100,
          },
          animatedHeader,
        ]}
      >
        <SafeAreaView>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              height: HEADER_HEIGHT,
            }}
          >
            <TouchableOpacity
              onPress={handleProfile}
              style={{ flexDirection: "row", alignItems: "center" }}
            >
              <Image
                source={require("@assets/images/avatar.png")}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  marginRight: 8,
                }}
              />
              <View>
                <StyledText
                  variant="h6"
                  color={Colors.neutralDark}
                >{`Haii ${user?.role} !`}</StyledText>
                <StyledText variant="h7" color={Colors.neutralDark}>
                  {user?.name}
                </StyledText>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleLogout}>
              <Icon
                name="powerOff"
                size={26}
                color={Colors.errorDark}
                strokeWidth={2}
              />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </Animated.View>

      <View style={{ marginTop: 10 }}>
        <View>
          <Text>Aadhi</Text>
          <Icon name="arrowLeft" size={20} color="red" />
        </View>
      </View>
      {/* Tabs */}
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: { backgroundColor: Colors.CloudDrift },
          tabBarIndicatorStyle: { backgroundColor: Colors.primary },
        }}
      >
        <Tab.Screen name="Attendance">
          {() => <TabContent tabName="Attendance" />}
        </Tab.Screen>
        <Tab.Screen name="Grades">
          {() => <TabContent tabName="Grades" />}
        </Tab.Screen>
        <Tab.Screen name="Fees">
          {() => <TabContent tabName="Fees" />}
        </Tab.Screen>
      </Tab.Navigator>
    </View>
  );
};

export default StudentsProfileScreen;
