import React, { FC, ReactNode } from "react";
import { StyleSheet, Text } from "react-native";

import { COLORS } from "../../constants/theme";
const CustomMediumText: FC<{ children: ReactNode; style?: any }> = ({
  children,
  style,
}) => {
  return <Text style={[styles.text, style]}>{children}</Text>;
};

const styles = StyleSheet.create({
  text: {
    fontFamily: "Montserrat_500Medium",
    lineHeight: 18,
    color: COLORS.white,
  },
});

export default CustomMediumText;
