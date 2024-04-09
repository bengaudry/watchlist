import {
  ActivityIndicator,
  ScrollView,
  useWindowDimensions,
} from "react-native";
import { ScrollViewProps, View } from "./Themed";
import { LoadingIndicator } from "./custom/LoadingView";

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
      <LoadingIndicator isLoading={isLoading} offsetX={-16} offsetY={-64} />
    </ScrollView>
  );
}
