import React, { FC, ReactNode } from "react";
import styles from "./button.style";
import { Pressable, StyleProp, ViewStyle } from "react-native";
import { COLORS } from "../../constants/theme";

interface Props extends React.ComponentProps<typeof Pressable> {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  showBg?: boolean;
}

const IconButton: FC<Props> = ({ children, showBg, ...props }) => {
  return (
    <Pressable
      {...props}
      style={[
        styles.iconButton,
        props.style,
        { backgroundColor: showBg ? COLORS.backgroundGray : "transparent" },
      ]}
    >
      {children}
    </Pressable>
  );
};

export default IconButton;
