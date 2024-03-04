import React, { FC } from "react";
import styles from "./button.style";
import { Pressable, StyleProp, ViewStyle } from "react-native";
import CustomBlackText from "../Text/CustomBlackText";

interface Props extends React.ComponentProps<typeof Pressable> {
  children: string;
  style?: StyleProp<ViewStyle>;
}

const Button: FC<Props> = ({ children, ...props }) => {
  return (
    <Pressable {...props} style={[styles.button, props.style]}>
      <CustomBlackText style={styles.text}>{children}</CustomBlackText>
    </Pressable>
  );
};

export default Button;
