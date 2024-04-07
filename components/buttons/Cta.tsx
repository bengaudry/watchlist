import { Ionicons } from "@expo/vector-icons";
import { ReactNode } from "react";
import { Pressable, PressableProps } from "react-native";

export function Cta(
  props: PressableProps & {
    icon?: (typeof Ionicons)["name"];
    fullWidth?: boolean;
  }
) {
  const { style, fullWidth, icon, children, ...otherProps } = props;

  return (
    <Pressable
      style={[
        {
          width: fullWidth ? "100%" : "auto",
          backgroundColor: "yellow",
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
      {
        //@ts-ignore
        icon && <Ionicons size={24} name={icon} />
      }
      {children as ReactNode}
    </Pressable>
  );
}
