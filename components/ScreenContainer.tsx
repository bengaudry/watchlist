import { View, ViewProps } from "./Themed";

export function ScreenContainer(props: ViewProps) {
  const { style, ...otherProps } = props;
  return (
    <View
      style={[
        { paddingTop: 64, paddingBottom: 32, paddingHorizontal: 16 },
        style,
      ]}
      {...otherProps}
    />
  );
}
