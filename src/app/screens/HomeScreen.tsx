import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  Platform,
  Image,
  FlatList,
} from "react-native";
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

import Icon from "@components/global/Icon";
import { Colors } from "@unistyles/constants";
import { useSharedState } from "@features/tabs/SharedContext";
import { useStyles } from "react-native-unistyles";
import { homeStyle } from "@unistyles/homeStyle";
import { getStorage, storage } from "@utils/mmkvStrorage";
import { UserType } from "@utils/types/authType";
import StyledText from "@components/global/StylesText";
import { navigate, resetAndNavigate } from "@utils/NavigationUtills";
import AdsBanner from "@components/pages/AdsBanner";
import { roleHomeMenus } from "@assets/data/mockdata";
import SectionMenu from "@components/pages/SectionMenu";

export interface HomeMenuItem {
  id: number;
  title: string;
  img: any;
  router: string;
}

const HomeScreen = () => {
  const { styles } = useStyles(homeStyle);
  const insets = useSafeAreaInsets();
  const [menus, setMenus] = useState<HomeMenuItem[]>([]);
  const { scrollY } = useSharedState();
  const lastOffsetY = useSharedValue(0);

  const [user, setUser] = useState<UserType | null>(null);

  // Load User
  const loadUser = () => {
    try {
      const userObj = getStorage("User");
      if (userObj) {
        const parsed = JSON.parse(userObj);
        setUser(parsed);
      }
    } catch (e) {
      console.error("Error loading user:", e);
    }
  };

  useEffect(() => {
    loadUser();
    const userObj = getStorage("User");
    if (!userObj) return;

    const user = JSON.parse(userObj);

    if (user.isAdmin === 1) setMenus(roleHomeMenus.admin);
    else if (user.isTeacher === 1) setMenus(roleHomeMenus.teacher);
    else if (user.isStudent === 1) setMenus(roleHomeMenus.student);
    else if (user.isParent === 1) setMenus(roleHomeMenus.parent);
  }, []);

  // Header Animation
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

  const HEADER_HEIGHT = 60;
  const TOTAL_HEADER_HEIGHT = HEADER_HEIGHT + insets.top;

  // Logout
  const handleLogout = () => {
    Alert.alert("Confirm Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: () => {
          storage.clearAll();
          resetAndNavigate("Splash");
        },
      },
    ]);
  };

  // Scroll Handler
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      const currentY = event.contentOffset.y;

      if (Math.abs(currentY - lastOffsetY.value) > 10) {
        scrollY.value = currentY > lastOffsetY.value ? 1 : 0;
      }

      lastOffsetY.value = currentY;
    },
  });

  const handleProfile = () => {
    navigate("Profile");
  };

  return (
    <View style={styles.container}>
      {/* Sticky Header */}
      <Animated.View
        style={[
          styles.headerBase,
          { height: TOTAL_HEADER_HEIGHT },
          animatedHeader,
        ]}
      >
        <SafeAreaView>
          <View style={styles.headerContent}>
            <View style={styles.content}>
              {/* Avatar */}
              <TouchableOpacity onPress={handleProfile}>
                <Image
                  source={require("@assets/images/avatar.png")}
                  style={styles.logo}
                />
              </TouchableOpacity>

              {/* Greeting */}
              <View>
                <StyledText
                  variant="h6"
                  fontFamily="Charm_Bold"
                  color={Colors.neutralDark}
                >{`Haii ${user?.role} !`}</StyledText>

                <StyledText
                  fontFamily="CharmRegular"
                  variant="h7"
                  color={Colors.neutralDark}
                >
                  {user?.name}
                </StyledText>
              </View>
            </View>

            {/* Logout */}
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

      {/* MAIN SCROLL: FlatList only */}
      <Animated.FlatList
        data={menus}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3}
        showsVerticalScrollIndicator={false}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        contentContainerStyle={{
          paddingTop: TOTAL_HEADER_HEIGHT,
          paddingBottom: 50,
        }}
        ListHeaderComponent={
          <>
            {/* Ads Banner */}
            <View style={styles.adsContainer}>
              <AdsBanner />
            </View>

            {/* Title */}
            <View style={styles.menusCont}>
              <StyledText
                variant="h4"
                fontFamily="CharmRegular"
                color={Colors.neutralDark}
              >
                Academics
              </StyledText>
            </View>
          </>
        }
        renderItem={({ item }) => (
          <SectionMenu title={item.title} img={item.img} router={item.router} />
        )}
      />
    </View>
  );
};

export default HomeScreen;
