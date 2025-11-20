import { View, Text, Image } from "react-native";
import React, { FC, useEffect } from "react";
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  Easing,
  withDelay,
} from "react-native-reanimated";
import { useStyles } from "react-native-unistyles";
import { splashStyle } from "@unistyles/splashStyle";
import { resetAndNavigate } from "@utils/NavigationUtills";
import StyledText from "@components/global/StylesText";

const SplashScreen: FC = () => {
  const { styles } = useStyles(splashStyle);

  // Shared values
  const logoOpacity = useSharedValue(0);
  const logoTranslateY = useSharedValue(20); // small slide up

  const textOpacity = useSharedValue(0);

  // Animations
  useEffect(() => {
    logoOpacity.value = withTiming(1, { duration: 700, easing: Easing.ease });
    logoTranslateY.value = withTiming(0, {
      duration: 700,
      easing: Easing.out(Easing.ease),
    });

    textOpacity.value = withDelay(
      700,
      withTiming(1, { duration: 600, easing: Easing.ease })
    );
  }, []);

  // Animated styles
  const animatedLogo = useAnimatedStyle(() => ({
    opacity: logoOpacity.value,
    transform: [{ translateY: logoTranslateY.value }],
  }));

  const animatedText = useAnimatedStyle(() => ({
    opacity: textOpacity.value,
  }));

  // useEffect(() => {
  //   const checkLoginStatus = setTimeout(() => {
  //     const token = storage.getString("Request_Token");

  //     if (token) {
  //       resetAndNavigate("UserBottomTabs");
  //     } else {
  //       resetAndNavigate("Login");
  //     }
  //   }, 5000);
  //   return () => clearTimeout(checkLoginStatus);
  // }, []);

  return (
    <View style={styles.mainContainer}>
      <Animated.View style={animatedLogo}>
        <Image
          source={require("@assets/images/logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />
      </Animated.View>

      {/* <Animated.Text style={[styles.createText, animatedText]}>
        SplashScreen
      </Animated.Text> */}
      <Animated.View style={animatedText}>
        <StyledText
          variant="h3"
          fontFamily="CharmRegular"
          style={styles.createText}
        >
          EDUCATION
        </StyledText>
        <StyledText
          variant="h3"
          fontFamily="CharmRegular"
          style={styles.createText}
        >
          MANAGEMENT SYSTEM
        </StyledText>
      </Animated.View>

      {/* Bottom Text */}
      <Animated.View style={[styles.bottomContainer, animatedText]}>
        <StyledText variant="h7" fontFamily="Roboto" style={styles.bottomText}>
          Crafted by VBM
        </StyledText>
      </Animated.View>
    </View>
  );
};

export default SplashScreen;
