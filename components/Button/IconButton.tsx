import React, { FC, ReactNode } from "react";
import styles from "./button.style";
import { Pressable, StyleProp, View, ViewStyle } from "react-native";
import { COLORS } from "../../constants/theme";

interface Props extends React.ComponentProps<typeof Pressable> {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  showBg?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
}

const IconButton: FC<Props> = ({
  containerStyle,
  children,
  showBg,
  ...props
}) => {
  const buttonStyles = [
    styles.iconButton,
    { backgroundColor: showBg ? COLORS.backgroundGray : "transparent" },
    props.style,
  ];
  return (
    <View style={[styles.iconButtonContainer, containerStyle]}>
      <Pressable
        android_ripple={{ color: COLORS.lightGray }}
        {...props}
        style={({ pressed }) =>
          pressed ? [...buttonStyles, styles.buttonPressed] : buttonStyles
        }
      >
        {children}
      </Pressable>
    </View>
  );
};

export default IconButton;
