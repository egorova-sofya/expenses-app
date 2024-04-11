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
