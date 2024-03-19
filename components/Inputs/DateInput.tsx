import React, { FC, useState } from "react";
import { View, StyleSheet } from "react-native";
import { COLORS } from "../../constants/theme";
import MaskInput, { Masks } from "react-native-mask-input";
import { Controller, FieldValues, UseControllerProps } from "react-hook-form";
import CustomRegularText from "../Text/CustomRegularText";

interface InputProps<T extends FieldValues> extends UseControllerProps<T> {
  label: string;
  isError?: boolean;
  keyboardType?: "default" | "number-pad" | "decimal-pad" | "numeric";
}

function DateInput<T extends FieldValues>({
  name,
  control,
  rules,
  label,
  isError,
  keyboardType,
}: InputProps<T>) {
  const [phone, setPhone] = React.useState("");
  const [isFocused, setIsFocused] = useState(false);

  return (
    <Controller
      rules={rules}
      render={({ field: { onChange, value }, fieldState }) => {
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
            <MaskInput
              style={[styles.input, isError && styles.validationError]}
              value={value}
              onChangeText={(masked) => {
                setPhone(masked);
                onChange(masked);
              }}
              mask={isFocused ? Masks.DATE_YYYYMMDD : undefined}
              keyboardType={keyboardType}
              maskAutoComplete
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholderTextColor="#FFF"
            />
          </View>
        );
      }}
      name={name}
      control={control}
    />
  );
}

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
    // color: COLORS.red,

    borderTopColor: "transparent",
    borderBottomColor: COLORS.white,
    paddingVertical: 8,
    paddingLeft: 8,
    textDecorationLine: "none",
  },
  validationError: {
    borderBottomColor: COLORS.red,
  },
});

export default DateInput;
