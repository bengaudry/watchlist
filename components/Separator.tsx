import { View } from "@/components/Themed";

export function Separator({ space }: { space?: number }) {
  return (
    <View
      style={{
        marginVertical: space ?? 30,
        height: 1,
        width: "80%",
      }}
      lightColor="#eee"
      darkColor="rgba(255,255,255,0.1)"
    />
  );
}
