import React, { useEffect, useRef } from "react";
import { View, Animated, Easing, StatusBar } from "react-native";
import { useStyles } from "react-native-unistyles";
import { Colors } from "@unistyles/constants";
import { LoaderAnimeStyle } from "@unistyles/LoaderAnimeStyle";
import StyledText from "@components/global/StylesText";

const LoaderAnimation = () => {
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const letterAnim = useRef(new Animated.Value(0)).current;
  const dotScales = Array.from(
    { length: 7 },
    () => useRef(new Animated.Value(0)).current
  );

  const { styles } = useStyles(LoaderAnimeStyle);
  const loadingText = "Loading...";

  // Spinner rotation
  useEffect(() => {
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 2000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, [rotateAnim]);

  // Letters animation
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        ...Array(10)
          .fill(0)
          .map((_, i) =>
            Animated.timing(letterAnim, {
              toValue: i,
              duration: 200,
              useNativeDriver: true,
            })
          ),
        Animated.timing(letterAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [letterAnim]);

  // Circle dot pulsing animation
  useEffect(() => {
    const animateDot = (dot: Animated.Value, delay: number) =>
      Animated.loop(
        Animated.sequence([
          Animated.timing(dot, {
            toValue: 1,
            duration: 400,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
            delay,
          }),
          Animated.timing(dot, {
            toValue: 0,
            duration: 400,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ])
      );

    Animated.parallel(
      dotScales.map((dot, i) => animateDot(dot, i * 150))
    ).start();
  }, [dotScales]);

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  const getLetterOpacity = (index: number) =>
    letterAnim.interpolate({
      inputRange: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      outputRange: Array.from({ length: 10 }, (_, i) =>
        i === index ? 1 : 0.3
      ),
    });

  return (
    <View style={styles.container}>
      <StatusBar barStyle="default" />
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginTop: 20,
        }}
      >
        <Animated.View
          style={{ width: 80, height: 80, transform: [{ rotate: spin }] }}
        >
          {dotScales.map((dot, i) => {
            const totalDots = dotScales.length;
            const angle = (i * 360) / totalDots;
            const radius = 30;
            const rad = (angle * Math.PI) / 180;

            return (
              <Animated.View
                key={i}
                style={{
                  position: "absolute",
                  left: 40 + radius * Math.cos(rad) - 6, // centerX + offset - half dot
                  top: 40 + radius * Math.sin(rad) - 6, // centerY + offset - half dot
                  width: 12,
                  height: 12,
                  borderRadius: 6,
                  backgroundColor: Colors.CloudDrift,
                  transform: [{ scale: dot }],
                }}
              />
            );
          })}
        </Animated.View>
      </View>

      {/* 🔤 Loading text */}
      <View style={{ flexDirection: "row", marginTop: 20 }}>
        {loadingText.split("").map((letter, i) => (
          <Animated.Text key={i} style={{ opacity: getLetterOpacity(i) }}>
            <StyledText
              variant="h4"
              fontFamily="HiMelodyRegular"
              color={Colors.CloudDrift}
            >
              {letter}
            </StyledText>
          </Animated.Text>
        ))}
      </View>
    </View>
  );
};

export default LoaderAnimation;
