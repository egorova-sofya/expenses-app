import React, { FC } from "react";
import { StyleSheet, View } from "react-native";
import TextInput from "../Inputs/TextInput";
import { Control, FieldErrors } from "react-hook-form";
import { IAuthValues } from "../../types";

interface Props {
  control: Control<IAuthValues>;
  errors: FieldErrors<IAuthValues>;
  isLoading: boolean;
}

const AuthForm: FC<Props> = ({ control, errors, isLoading }) => {
  return (
    <View style={styles.inputsContainer}>
      <TextInput
        rules={{ required: true }}
        isError={!!errors.email}
        label="Email"
        name="email"
        control={control}
        inputMode="email"
        editable={!isLoading}
      />
      <TextInput
        rules={{ required: true, minLength: 6 }}
        isError={!!errors.password}
        label="Password"
        name="password"
        control={control}
        editable={!isLoading}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputsContainer: {
    flexDirection: "column",
    gap: 32,
    marginBottom: 80,
  },
});

export default AuthForm;
