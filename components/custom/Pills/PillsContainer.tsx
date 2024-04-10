import React from "react";
import { ScrollView, View } from "react-native";
import { Pill } from "./Pill";

export const PillsContainer = ({ list }: { list?: Array<string> }) => (
  <ScrollView horizontal showsHorizontalScrollIndicator={false}>
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        gap: 10,
        paddingHorizontal: 16,
        maxHeight: 34
      }}
    >
      {list?.map((el, idx) => (
        <Pill label={el} key={idx} />
      ))}
    </View>
  </ScrollView>
);
