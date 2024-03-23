import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { COLORS } from "../../constants/theme";

const LoadingOverlay = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={COLORS.white} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.black,
    alignContent: "center",
    justifyContent: "center",
  },
});

export default LoadingOverlay;
