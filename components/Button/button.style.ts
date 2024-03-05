import { StyleSheet } from "react-native";

import { COLORS, SIZES } from "../../constants/theme";

const styles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.yellow,
    paddingHorizontal: 40,
    paddingVertical: 22,
    borderRadius: 40,
  },
  text: {
    textAlign: "center",
    color: COLORS.black,
    fontSize: 22,
    lineHeight: 27,
  },
  iconButtonContainer: {
    borderRadius: 21,
    overflow: "hidden",
  },
  iconButton: {
    width: 42,
    height: 42,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonPressed: {
    opacity: 0.5,
  },
});

export default styles;
