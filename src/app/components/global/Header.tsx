import React from "react";
import { View, TouchableOpacity, Image } from "react-native";
import Animated, {
  useAnimatedStyle,
  interpolate,
  Extrapolate,
} from "react-native-reanimated";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { Colors } from "@unistyles/constants";
import StyledText from "@components/global/StylesText";
import Icon from "@components/global/Icon";

type HeaderProps = {
  user: { name: string; role: string } | null;
  lastOffsetY: Animated.SharedValue<number>;
  onLogout: () => void;
  onProfile: () => void;
};

const HEADER_HEIGHT = 60;

const Header = ({ user, lastOffsetY, onLogout, onProfile }: HeaderProps) => {
  const insets = useSafeAreaInsets();
  const TOTAL_HEADER_HEIGHT = HEADER_HEIGHT + insets.top;

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
    return { shadowOpacity, elevation };
  });

  return (
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
            onPress={onProfile}
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
              <StyledText variant="h6" color={Colors.neutralDark}>
                {`Haii ${user?.role} !`}
              </StyledText>
              <StyledText variant="h7" color={Colors.neutralDark}>
                {user?.name}
              </StyledText>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={onLogout}>
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
  );
};

export default Header;
