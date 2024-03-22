import React, { useState } from "react";
import { TextInput as RNTextInput, View } from "react-native";
import CustomRegularText from "../Text/CustomRegularText";
import { Controller, FieldValues } from "react-hook-form";
import styles from "./input.style";
import { InputProps } from "./props";

function TextInput<T extends FieldValues>({
  name,
  control,
  rules,
  label,
  isError,
  keyboardType,
}: InputProps<T>) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <Controller
      rules={rules}
      render={({ field: { onChange, value }, fieldState }) => {
        const showBigLabel = value.length === 0 && !isFocused;
        const showSmallLabel = value.length > 0 || isFocused;
        return (
          <>
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
                style={[styles.input, isError && styles.validationError]}
                value={value}
                onChangeText={onChange}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                keyboardType={keyboardType}
              />
            </View>
          </>
        );
      }}
      name={name}
      control={control}
    />
  );
}

export default TextInput;
