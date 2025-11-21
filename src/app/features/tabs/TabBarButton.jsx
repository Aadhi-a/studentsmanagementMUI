import React, { useEffect } from "react";
import { StyleSheet, Pressable } from "react-native";
import { icons } from "./TabIcon";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { Fonts } from "@unistyles/constants";

const TabBarButton = ({
  onPress,
  onLongPress,
  isFocused,
  route,
  color,
  gradientColor,
  label,
  size,
}) => {
  const IconComponent = icons[route];

  const scale = useSharedValue(0);

  useEffect(() => {
    scale.value = withSpring(
      typeof isFocused === "boolean" ? (isFocused ? 1 : 0) : isFocused,
      {
        damping: 10,
        stiffness: 100,
        mass: 1,
      }
    );
  }, [scale, isFocused]);

  const animatedIconStyle = useAnimatedStyle(() => {
    const scaleValue = interpolate(scale.value, [0, 1], [1, 1.4]);
    const top = interpolate(scale.value, [0, 1], [0, 8]);

    return {
      transform: [{ scale: scaleValue }],
      top,
    };
  });
  const animatedTextStyle = useAnimatedStyle(() => {
    const opacity = interpolate(scale.value, [0, 1], [1, 0]);

    return {
      // styles
      opacity,
    };
  });
  return (
    <Pressable
      onPress={onPress}
      onLongPress={onLongPress}
      style={styles.container}
    >
      <Animated.View style={[animatedIconStyle]}>
        {IconComponent &&
          IconComponent({ color, size, isFocused, gradientColor })}
      </Animated.View>

      <Animated.Text style={[styles.tabText, { color }, animatedTextStyle]}>
        {label}
      </Animated.Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 4,
  },
  tabText: {
    fontSize: 10,
    fontFamily: Fonts.RobotoSlab,
    letterSpacing: 2,
    fontWeight: 600,
  },
});

export default TabBarButton;
