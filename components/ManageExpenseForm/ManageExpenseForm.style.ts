import { StyleSheet } from "react-native";
import { COLORS } from "../../constants/theme";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    marginBottom: 52,
  },
  title: {
    fontSize: 49,
    lineHeight: 60,
    marginBottom: 40,
  },
  inputsContainer: {
    flexDirection: "column",
    gap: 32,
  },
  locationLabel: {
    color: COLORS.darkGray2,
    fontSize: 18,
    lineHeight: 22,
    marginBottom: 8,
  },

  locationBtnText: {
    fontSize: 18,
    lineHeight: 22,
    color: COLORS.white,
    textDecorationLine: "underline",
    textDecorationColor: COLORS.white,
  },
  button: {
    width: 220,
    alignSelf: "center",
    marginTop: "auto",
    marginBottom: 40,
  },
});

export default styles;
