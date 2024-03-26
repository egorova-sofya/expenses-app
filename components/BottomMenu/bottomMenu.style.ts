import { StyleSheet } from "react-native";

import { COLORS } from "../../constants/theme";

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "flex-end",
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 0,
  },
  modal: {
    width: "100%",
    height: 240,
    marginTop: "auto",
  },
  menu: {
    backgroundColor: COLORS.white,
    height: "100%",
    padding: 18,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    gap: 16,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    padding: 12,
    borderRadius: 22,
    backgroundColor: COLORS.lightGray,
  },
  text: {
    fontSize: 18,
    lineHeight: 22,
    color: COLORS.black,
  },
});

export default styles;
