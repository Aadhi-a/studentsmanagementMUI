// sharedContext.tsx
import React, { createContext, FC, ReactNode, useContext } from "react";
import Animated, { useSharedValue, withTiming } from "react-native-reanimated";

interface SharedStateContextType {
  scrollY: Animated.SharedValue<number>;
  scrollYGloball: Animated.SharedValue<number>;
  scrollTop: () => void;
}

const SharedStateContext = createContext<SharedStateContextType | undefined>(undefined);

export const SharedStateprovider: FC<{ children: ReactNode }> = ({ children }) => {
  const scrollY = useSharedValue(0);
  const scrollYGloball = useSharedValue(0);

  const scrollTop = () => {
    scrollY.value = withTiming(0, { duration: 300 });
    scrollYGloball.value = withTiming(0, { duration: 300 });
  };

  return (
    <SharedStateContext.Provider value={{ scrollTop, scrollY, scrollYGloball }}>
      {children}
    </SharedStateContext.Provider>
  );
};

export const useSharedState = () => {
  const context = useContext(SharedStateContext);
  if (context === undefined) {
    throw new Error("useSharedState must be used within a SharedStateProvider");
  }
  return context;
};
