import { ScrollView } from "react-native";
import { ViewProps } from "./Themed";

export function ScreenContainer(props: ViewProps) {
  const { style, ...otherProps } = props;
  return (
    <ScrollView
      style={[
        { paddingVertical: 64, paddingHorizontal: 16 },
        style,
      ]}
      {...otherProps}
    />
  );
}
