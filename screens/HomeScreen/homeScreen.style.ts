import { StyleSheet } from "react-native";

import { COLORS } from "../../constants/theme";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  welcomeText: {
    fontSize: 52,
    lineHeight: 52,
    marginTop: 40,
    marginBottom: 16,
  },
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
  addButtonContainer: {
    position: "absolute",
    bottom: 20,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    width: "100%",
    height: 72,
    overflow: "hidden",
  },
  addButton: {
    width: 72,
    height: 72,
    borderRadius: 36,
    overflow: "hidden",
  },
});

export default styles;
