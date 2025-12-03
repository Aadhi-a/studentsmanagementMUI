import React from "react";
import Animated from "react-native-reanimated";
import { FlatList, FlatListProps } from "react-native";

type Props = {
  data: any[];
  flatListRef: any;
  onScroll?: any; // Reanimated scroll handler
  renderItem: FlatListProps<any>["renderItem"];
};

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const TabContent = ({ data, flatListRef, onScroll, renderItem }: Props) => {
  return (
    <AnimatedFlatList
      ref={flatListRef}
      data={data}
      keyExtractor={(_, index) => index.toString()}
      renderItem={renderItem}
      contentContainerStyle={{ paddingBottom: 120 }}
      // ⭐ THE IMPORTANT PART ⭐
      onScroll={onScroll}
      scrollEventThrottle={16}
    />
  );
};

export default TabContent;
