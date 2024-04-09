import { Pressable } from "react-native";
import Colors from "@/constants/Colors";
import { Text } from "@/components/Themed";

export const Pill = ({ label }: { label: string }) => (
  <Pressable
    style={{
      backgroundColor: Colors.borderColor,
      paddingHorizontal: 20,
      paddingVertical: 6,
      borderRadius: 9999,
      width: "auto",
    }}
  >
    <Text style={{ color: Colors.secondaryText }}>{label}</Text>
  </Pressable>
);