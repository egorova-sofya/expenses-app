import React from "react";
import { StyleSheet, View } from "react-native";
import CustomMediumText from "../Text/CustomMediumText";
import { COLORS } from "../../constants/theme";

const ErrorOverlay = () => {
  return (
    <View style={styles.container}>
      <CustomMediumText style={styles.text}>
        Something went wrong. Please reload the app.
      </CustomMediumText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.black,
    alignContent: "center",
    justifyContent: "center",
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
  },
  text: {
    textAlign: "center",
  },
});

export default ErrorOverlay;
