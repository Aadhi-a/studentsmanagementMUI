import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  Platform,
  Image,
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
import { getStorage } from "@utils/mmkvStrorage";
import { UserType } from "@utils/types/authType";
import StyledText from "@components/global/StylesText";
import { navigate, resetAndNavigate } from "@utils/NavigationUtills";

const HomeScreen = () => {
  const { styles } = useStyles(homeStyle);
  const insets = useSafeAreaInsets();
  const { scrollY } = useSharedState();
  const lastOffsetY = useSharedValue(0);
  const [user, setUser] = useState<UserType | null>(null);

  const loadUser = () => {
    try {
      const userObj = getStorage("User");
      console.log("HomeScreenUserGet", userObj);
      if (userObj) {
        const parsed = JSON.parse(userObj);
        setUser(parsed);
        console.log("User:parsed", parsed);
      }
    } catch (e) {
      console.error("Error loading user:", e);
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

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

  const handleLogout = () => {
    Alert.alert("Confirm Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      { text: "Logout", style: "destructive", onPress: () => {} },
    ]);
  };

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
              <View>
                <TouchableOpacity onPress={handleProfile}>
                  <Image
                    source={require("@assets/images/avatar.png")}
                    style={styles.logo}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              </View>
              <View>
                <StyledText
                  variant="h6"
                  fontFamily="Charm_Bold"
                  style={{ fontWeight: 400 }}
                  color={Colors.neutralDark}
                >
                  {`Haii  ${user?.role} !`}
                </StyledText>
                <StyledText
                  variant="h7"
                  fontFamily="Charm_Bold"
                  style={{ fontWeight: 400 }}
                  color={Colors.neutralDark}
                >
                  {user?.name}
                </StyledText>
              </View>
            </View>
            <View>
              <TouchableOpacity onPress={handleLogout}>
                <Icon
                  name="powerOff"
                  size={26}
                  color={Colors.errorDark}
                  strokeWidth={2}
                />
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </Animated.View>

      {/* Scroll Area → Starts exactly AFTER the header */}
      <Animated.ScrollView
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: TOTAL_HEADER_HEIGHT,
        }}
      >
        {Array.from({ length: 100 }, (_, i) => (
          <Text
            key={i}
            style={{
              fontSize: 16,
              paddingVertical: 12,
              textAlign: "center",
            }}
          >
            {i + 1}
          </Text>
        ))}
      </Animated.ScrollView>
    </View>
  );
};

export default HomeScreen;
