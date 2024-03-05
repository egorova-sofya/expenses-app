import { StyleSheet } from "react-native";

import { COLORS } from "../../constants/theme";

const styles = StyleSheet.create({
  cardsList: {
    flex: 1,
  },
  card: {
    borderRadius: 30,
    overflow: "hidden",
    marginVertical: 10,
  },
  button: {
    padding: 18,
  },
  content: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  separator: {
    height: 68,
    width: 20,
    backgroundColor: COLORS.black,
    borderRadius: 12,
  },
  title: {
    fontSize: 18,
    lineHeight: 22,
    color: COLORS.black,
  },
  date: {
    fontSize: 12,
    lineHeight: 15,
    color: COLORS.black,
  },
  price: {
    fontSize: 32,
    lineHeight: 39,
    color: COLORS.black,
  },
  buttonPressed: {
    opacity: 0.5,
  },
});

export default styles;
