import React, { FC, useState } from "react";
import { TextInput as RNTextInput, StyleSheet, View } from "react-native";
import { COLORS } from "../../constants/theme";
import CustomRegularText from "../Text/CustomRegularText";

interface Props extends React.ComponentProps<typeof RNTextInput> {
  label: string;
  value: string;
  onChangeFn: (value: string) => void;
}

const TextInput: FC<Props> = ({ label, value, onChangeFn, ...props }) => {
  const [isFocused, setIsFocused] = useState(false);
  const showBigLabel = value.length === 0 && !isFocused;
  const showSmallLabel = value.length > 0 || isFocused;

  return (
    <View style={styles.container}>
      <View
        style={[
          showBigLabel && styles.labelContainer,
          showSmallLabel && styles.smallLabelContainer,
        ]}
      >
        <CustomRegularText
          style={[
            showBigLabel && styles.label,
            showSmallLabel && styles.smallLabel,
          ]}
        >
          {label}
        </CustomRegularText>
      </View>
      <RNTextInput
        {...props}
        style={[styles.input, props.style]}
        value={value}
        onChangeText={onChangeFn}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
    </View>
  );
};

export default TextInput;

const styles = StyleSheet.create({
  container: {
    position: "relative",
  },
  labelContainer: {
    height: "100%",
    left: 8,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    color: COLORS.darkGray2,
    fontSize: 18,
  },
  smallLabelContainer: {
    height: "100%",
    left: 8,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    top: -20,
  },
  smallLabel: {
    color: COLORS.foregroundGray,
    fontSize: 11,
  },
  input: {
    height: 40,
    borderWidth: 1,
    fontSize: 18,
    color: COLORS.white,
    borderTopColor: "transparent",
    borderBottomColor: COLORS.white,
    paddingVertical: 8,
    paddingLeft: 8,
    textDecorationLine: "none",
  },
});
