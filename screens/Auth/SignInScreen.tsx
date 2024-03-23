import React from "react";
import MainLayout from "../../components/Layout/MainLayout";
import CustomMediumText from "../../components/Text/CustomMediumText";
import styles from "./auth.style";
import { Pressable, View } from "react-native";
import TextInput from "../../components/Inputs/TextInput";
import { useForm } from "react-hook-form";
import Button from "../../components/Button/Button";
import { IAuthValues } from "../../types";
import CustomRegularText from "../../components/Text/CustomRegularText";
import CustomBlackText from "../../components/Text/CustomBlackText";

const SignInScreen = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmitFn = (data: IAuthValues) => {
    //submitting form
  };

  return (
    <MainLayout>
      <View style={styles.container}>
        <CustomMediumText style={styles.title}>Sign In</CustomMediumText>
        <View style={styles.inputsContainer}>
          <TextInput
            rules={{ required: true }}
            isError={!!errors.email}
            label="Email"
            name="email"
            control={control}
          />
          <TextInput
            rules={{ required: true }}
            isError={!!errors.password}
            label="Password"
            name="password"
            control={control}
          />
        </View>

        <View style={styles.buttonsContainer}>
          <Button style={styles.button} onPress={handleSubmit(onSubmitFn)}>
            Sign In
          </Button>
          <View style={styles.textContainer}>
            <CustomRegularText style={styles.text}>
              Don’t have an account?
            </CustomRegularText>
            <Pressable style={styles.link}>
              <CustomBlackText style={styles.linkText}>Sign Up</CustomBlackText>
            </Pressable>
          </View>
        </View>
      </View>
    </MainLayout>
  );
};

export default SignInScreen;
