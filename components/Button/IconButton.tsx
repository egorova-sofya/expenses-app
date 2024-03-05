import React, { FC, ReactNode } from "react";
import styles from "./button.style";
import { Pressable, StyleProp, View, ViewStyle } from "react-native";
import { COLORS } from "../../constants/theme";

interface Props extends React.ComponentProps<typeof Pressable> {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  showBg?: boolean;
}

const IconButton: FC<Props> = ({ children, showBg, ...props }) => {
  const buttonStyles = [
    styles.iconButton,
    props.style,
    { backgroundColor: showBg ? COLORS.backgroundGray : "transparent" },
  ];
  return (
    <View style={styles.iconButtonContainer}>
      <Pressable
        android_ripple={{ color: COLORS.lightGray }}
        style={({ pressed }) =>
          pressed ? [...buttonStyles, styles.buttonPressed] : buttonStyles
        }
        {...props}
      >
        {children}
      </Pressable>
    </View>
  );
};

export default IconButton;
