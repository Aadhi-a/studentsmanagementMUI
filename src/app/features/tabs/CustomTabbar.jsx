import React from "react";
import Animated, {
  useAnimatedStyle,
  interpolate,
  Extrapolate,
  withTiming,
} from "react-native-reanimated";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import TabBarButton from "./TabBarButton";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Colors } from "@unistyles/constants";
import { View, Image } from "react-native";
import { useSharedState } from "./SharedContext";

function CustomTabBar({ state, descriptors, navigation }) {
  const insets = useSafeAreaInsets();
  const { scrollY } = useSharedState();
  const { styles } = useStyles(userBottomStyle);
  // Animate TabBar based on scrollY
  const animatedTabBarStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY:
            scrollY.value === 1
              ? withTiming(100, { duration: 300 })
              : withTiming(0, { duration: 300 }),
        },
      ],
    };
  });

  return (
    <Animated.View
      style={[
        styles.tabbar,
        {
          paddingBottom: insets.bottom + 10,
        },
        animatedTabBarStyle,
      ]}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label = options.tabBarLabel ?? options.title ?? route.name;
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <TabBarButton
            key={route.name}
            style={styles.tabbarItem}
            route={route.name}
            label={label}
            isFocused={isFocused}
            options={options}
            onPress={onPress}
            onLongPress={onLongPress}
            color={isFocused ? Colors.primary : Colors.primaryScale[950]}
            gradientColor={
              isFocused ? Colors.gradientActive : Colors.bottomTabInActive
            }
            size={isFocused ? 20 : 22}
          />
        );
      })}
    </Animated.View>
  );
}

export default CustomTabBar;

const userBottomStyle = createStyleSheet(({ fonts, colors, device }) => ({
  tabbar: {
    width: device.width,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.neutral,
    paddingVertical: 15,
    paddingHorizontal: 10,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 90,
    shadowOpacity: 0.1,
    elevation: 15,
    zIndex: 10,
  },
}));
