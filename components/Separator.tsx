import { View } from "@/components/Themed";

export function Separator({ space }: { space?: number }) {
  return (
    <View
      style={{
        marginVertical: space ?? 30,
        marginHorizontal: "auto",
        height: 1,
        width: "100%",
      }}
      lightColor="#eee"
      darkColor="rgba(255,255,255,0.1)"
    />
  );
}
