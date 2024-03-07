import { StyleSheet } from "react-native";

import { COLORS, SIZES } from "../../constants/theme";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  tab: {
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
  },
  linearGradient: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  tabText: {
    width: "100%",
    paddingBottom: 10,
    textAlign: "center",
    fontSize: 18,
    lineHeight: 22,
    backgroundColor: COLORS.black,
    marginBottom: 2,
  },
});

export default styles;
