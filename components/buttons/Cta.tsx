import { Ionicons } from "@expo/vector-icons";
import { ReactNode } from "react";
import { Pressable, PressableProps } from "react-native";

import { Text } from "../Themed";

export function Cta(
  props: PressableProps & {
    icon?: (typeof Ionicons)["name"];
    fullWidth?: boolean;
    importance?: "primary" | "secondary";
    label?: string;
  }
) {
  const { label, importance, style, fullWidth, icon, children, ...otherProps } =
    props;

  const isPrimary = () => !importance || importance == "primary";

  return (
    <Pressable
      style={[
        {
          width: fullWidth ? "100%" : "auto",
          backgroundColor: isPrimary() ? "yellow" : "rgba(70, 70 ,70, 1)",
          paddingHorizontal: 16,
          paddingVertical: 8,
          borderRadius: 9999,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
        },
        // @ts-ignore
        style,
      ]}
      {...otherProps}
    >
      {icon && (
        <Ionicons
          size={24}
          //@ts-ignore
          name={icon}
          color={isPrimary() ? "black" : "white"}
        />
      )}
      <Text
        style={{
          textAlign: "center",
          color: isPrimary() ? "black" : "white",
        }}
      >
        {label}
      </Text>
      {children as ReactNode}
    </Pressable>
  );
}
