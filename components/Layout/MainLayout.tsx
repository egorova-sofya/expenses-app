import React, { FC } from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { COLORS, SIZES } from "../../constants/theme";

interface Props {
  children: React.ReactNode;
}

const MainLayout: FC<Props> = ({ children }) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.content}>{children}</View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: SIZES.horizontalIndent,
    paddingVertical: 60,
    backgroundColor: COLORS.black,
    position: "relative",
  },
});

export default MainLayout;
