import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../constants/theme";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 12,
  },

  iconsContainer: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
  },
});

export default styles;
