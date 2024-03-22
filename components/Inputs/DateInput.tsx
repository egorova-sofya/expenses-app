import React, { useState } from "react";
import { View } from "react-native";
import MaskInput, { Masks } from "react-native-mask-input";
import { Controller, FieldValues } from "react-hook-form";
import CustomRegularText from "../Text/CustomRegularText";
import styles from "./input.style";
import { InputProps } from "./props";

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

export default DateInput;
