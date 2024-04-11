import { StyleSheet } from "react-native";

import { COLORS } from "../../constants/theme";

const styles = StyleSheet.create({
  descriptionContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 28,
  },
  descriptionTitle: {
    fontSize: 18,
    lineHeight: 22,
  },
  descriptionValue: {
    fontSize: 12,
    lineHeight: 15,
    color: COLORS.foregroundGray,
  },
  cardsList: {
    flex: 1,
    paddingBottom: 110,
  },
});

export default styles;
