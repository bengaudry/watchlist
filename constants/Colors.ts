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
  dark: darkTheme
};
