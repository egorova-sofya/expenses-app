import { StyleSheet } from "react-native";

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
    gap: 24,
  },
  button: {
    width: 220,
    alignSelf: "center",
    marginTop: "auto",
    marginBottom: 40,
  },
});

export default styles;
