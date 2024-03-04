import { StyleSheet } from "react-native";

import { COLORS, SIZES } from "../../constants/theme";

const styles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.yellow,
    paddingHorizontal: 40,
    paddingVertical: 8,
    borderRadius: 54,
  },
  text: {
    textAlign: "center",
    color: COLORS.black,
    fontSize: 12,
    lineHeight: 23,
  },
  iconButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default styles;
