import { StyleSheet } from "react-native";

import { COLORS } from "../../constants/theme";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.black,
  },
  iconsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 40,
  },
  title: {
    fontSize: 49,
    lineHeight: 60,
    marginBottom: 20,
  },
  detailsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  detailTitle: {
    color: COLORS.foregroundGray,
    fontSize: 12,
    lineHeight: 15,
  },
  value: {
    fontSize: 32,
    lineHeight: 39,
  },
  button: {
    marginTop: "auto",
    width: 220,
    alignSelf: "center",
  },
});

export default styles;
