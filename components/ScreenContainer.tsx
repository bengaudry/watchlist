import {
  ActivityIndicator,
  ScrollView,
  useWindowDimensions,
} from "react-native";
import { ScrollViewProps, View } from "./Themed";
import { Ionicons } from "@expo/vector-icons";

export function ScreenContainer(
  props: ScrollViewProps & { isLoading?: boolean }
) {
  const { style, isLoading, children, ...otherProps } = props;
  const { width, height } = useWindowDimensions();

  return (
    <ScrollView
      style={[
        {
          paddingVertical: 64,
          paddingHorizontal: 16,
          overflow: isLoading ? "hidden" : "scroll",
        },
        style,
      ]}
      {...otherProps}
    >
      {children}
      {isLoading && (
        <View
          style={{
            position: "absolute",
            width: width,
            height: height,
            top: -64,
            left: -16,
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ActivityIndicator animating size="large" />
        </View>
      )}
    </ScrollView>
  );
}
