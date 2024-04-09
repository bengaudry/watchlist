import { ActivityIndicator, useWindowDimensions } from "react-native";
import { View } from "../Themed";

export function LoadingIndicator({
  isLoading,
  offsetX,
  offsetY,
  opacity,
}: {
  isLoading?: boolean;
  offsetX?: number;
  offsetY?: number;
  opacity?: number;
}) {
  const { width, height } = useWindowDimensions();
  return (
    <View
      style={{
        position: "absolute",
        opacity: isLoading ? 1 : 0,
        display: isLoading ? "flex" : "none",
        width: width,
        height: height,
        top: offsetY,
        left: offsetX,
        backgroundColor: `rgba(0, 0, 0, ${
          opacity && opacity >= 0 && opacity <= 1 ? opacity : 0.7
        })`,
        justifyContent: "center",
        alignItems: "center",
        zIndex: 500,
      }}
    >
      <ActivityIndicator animating size="large" />
    </View>
  );
}
