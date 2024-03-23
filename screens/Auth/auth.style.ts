import { StyleSheet } from "react-native";

import { COLORS } from "../../constants/theme";

const styles = StyleSheet.create({
  image: {
    flex: 1,
    justifyContent: "center",
  },
  container: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    fontSize: 49,
    lineHeight: 60,
    textAlign: "center",
    marginBottom: 20,
  },
  inputsContainer: {
    flexDirection: "column",
    gap: 32,
    marginBottom: 80,
  },
  buttonsContainer: {
    flexDirection: "column",
    gap: 40,
    alignItems: "center",
  },
  button: {
    width: 220,
    alignSelf: "center",
  },
  textContainer: {
    flexDirection: "row",
    gap: 4,
  },
  text: {
    color: COLORS.foregroundGray,
    fontSize: 12,
  },
  link: {
    height: 42,
  },
  linkText: {
    textDecorationLine: "underline",
    fontSize: 12,
  },
});

export default styles;
