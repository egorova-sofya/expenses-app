import { StyleSheet } from "react-native";
import { COLORS } from "../../constants/theme";

const styles = StyleSheet.create({
  container: {
    position: "relative",
  },
  labelContainer: {
    height: "100%",
    left: 8,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    color: COLORS.darkGray2,
    fontSize: 18,
  },
  smallLabelContainer: {
    height: "100%",
    left: 8,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    top: -20,
  },
  smallLabel: {
    color: COLORS.foregroundGray,
    fontSize: 11,
  },
  input: {
    height: 40,
    borderWidth: 1,
    fontSize: 18,
    color: COLORS.white,
    borderTopColor: "transparent",
    borderBottomColor: COLORS.white,
    paddingVertical: 8,
    paddingLeft: 8,
    textDecorationLine: "none",
  },
  validationError: {
    borderBottomColor: COLORS.red,
  },
});

export default styles;
