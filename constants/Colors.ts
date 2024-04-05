const tintColorLight = "#2f95dc";
const tintColorDark = "#fff";

const lightTheme = {
  text: "#000",
  background: "#fff",
  tint: tintColorLight,
  tabIconDefault: "#ccc",
  tabIconSelected: tintColorLight,
};

const darkTheme = {
  text: "#fff",
  background: "#000",
  tint: tintColorDark,
  tabIconDefault: "#ccc",
  tabIconSelected: tintColorDark,
};

export default {
  light: darkTheme,
  dark: darkTheme,
  borderColor: "rgba(255,255,255,0.1)",
  primaryText: "white",
  secondaryText: "#707070",
  inputBackground: "#181818",
};
