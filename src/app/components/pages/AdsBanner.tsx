import React, { FC, useEffect, useRef, useState } from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withDelay,
  withTiming,
  Easing,
  runOnJS,
} from "react-native-reanimated";

const AdsBanner: FC = () => {
  const { styles } = useStyles(AdsBannerStyle);
  const texts = ["Alg0 trading", "Alg0 brand"];
  const maxLength = Math.max(...texts.map((t) => t.length));

  // Stable shared values for maxLength letters
  const animRefs = useRef(
    Array.from({ length: maxLength }).map(() => ({
      opacity: useSharedValue(0),
      translateY: useSharedValue(-20),
    }))
  ).current;

  const [currentIndex, setCurrentIndex] = useState(0);

  const letters = texts[currentIndex].split("");

  const animatedStyles = animRefs.map(({ opacity, translateY }) =>
    useAnimatedStyle(() => ({
      opacity: opacity.value,
      transform: [{ translateY: translateY.value }],
    }))
  );

  const animateIn = (onComplete?: () => void) => {
    letters.forEach((_, index) => {
      const delay = index * 150;
      animRefs[index].opacity.value = withDelay(
        delay,
        withTiming(1, { duration: 500, easing: Easing.out(Easing.exp) })
      );
      animRefs[index].translateY.value = withDelay(
        delay,
        withTiming(0, { duration: 500, easing: Easing.out(Easing.exp) })
      );
    });

    const totalTime = letters.length * 150 + 500;
    setTimeout(() => onComplete && onComplete(), totalTime);
  };

  const animateOut = (onComplete?: () => void) => {
    letters.forEach((_, index) => {
      const delay = index * 100;
      animRefs[index].opacity.value = withDelay(
        delay,
        withTiming(0, { duration: 400, easing: Easing.in(Easing.exp) })
      );
      animRefs[index].translateY.value = withDelay(
        delay,
        withTiming(-20, { duration: 400, easing: Easing.in(Easing.exp) })
      );
    });

    const totalTime = letters.length * 100 + 400;
    setTimeout(() => onComplete && onComplete(), totalTime);
  };

  useEffect(() => {
    const loopAnimation = () => {
      animateIn(() => {
        setTimeout(() => {
          animateOut(() => {
            runOnJS(setCurrentIndex)((currentIndex + 1) % texts.length);
          });
        }, 1000);
      });
    };

    loopAnimation();
  }, [currentIndex]);

  return (
    <View style={styles.container}>
      <View style={{ width: 100, height: 100 }}>
        <Image
          source={require("@assets/images/ads.jpg")}
          style={{ width: 400, height: 250 }}
          resizeMode="stretch"
        />
      </View>
      {/* {letters.map((char, index) => (
        <Animated.Text
          key={index}
          style={[styles.letter, animatedStyles[index]]}
        >
          {char}
        </Animated.Text>
      ))} */}
    </View>
  );
};

export default AdsBanner;

import { createStyleSheet, useStyles } from "react-native-unistyles";

const AdsBannerStyle = createStyleSheet(
  ({ fonts, colors, device, borderRadius, borderWidth }) => ({
    container: {
      // margin: 20,
      // padding: 20,
      // borderWidth: 1,
      // borderColor: colors.neutralDark,
      // borderRadius: borderRadius.md,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      // backgroundColor: colors.primaryScale[100],
      flexDirection: "row",
    },
    letter: {
      fontSize: 32,
      fontWeight: "bold",
      color: "#333",
    },
  })
);
