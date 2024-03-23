import React from "react";
import MainLayout from "../../components/Layout/MainLayout";
import CustomMediumText from "../../components/Text/CustomMediumText";
import styles from "./auth.style";
import { ImageBackground, Pressable, View } from "react-native";
import TextInput from "../../components/Inputs/TextInput";
import { useForm } from "react-hook-form";
import Button from "../../components/Button/Button";
import { IAuthValues, StackNavigation } from "../../types";
import CustomRegularText from "../../components/Text/CustomRegularText";
import CustomBlackText from "../../components/Text/CustomBlackText";
import { useNavigation } from "@react-navigation/native";

const SignUpScreen = () => {
  const { navigate } = useNavigation<StackNavigation>();

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

  const goToSignIn = () => {
    navigate("SignIn");
  };

  return (
    <MainLayout>
      <ImageBackground
        source={require("./../../assets/images/money-bg.png")}
        resizeMode="cover"
        style={styles.image}
      >
        <View style={styles.container}>
          <CustomMediumText style={styles.title}>Sign Up</CustomMediumText>
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
              Sign Up
            </Button>
            <View style={styles.textContainer}>
              <CustomRegularText style={styles.text}>
                Already have an account?
              </CustomRegularText>
              <Pressable onPress={goToSignIn} style={styles.link}>
                <CustomBlackText style={styles.linkText}>
                  Sign In
                </CustomBlackText>
              </Pressable>
            </View>
          </View>
        </View>
      </ImageBackground>
    </MainLayout>
  );
};

export default SignUpScreen;
