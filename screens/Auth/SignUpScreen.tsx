import React, { useEffect } from "react";
import MainLayout from "../../components/Layout/MainLayout";
import CustomMediumText from "../../components/Text/CustomMediumText";
import styles from "./auth.style";
import { Alert, ImageBackground, Pressable, View } from "react-native";
import TextInput from "../../components/Inputs/TextInput";
import { useForm } from "react-hook-form";
import Button from "../../components/Button/Button";
import { IAuthValues, StackNavigation } from "../../types";
import CustomRegularText from "../../components/Text/CustomRegularText";
import CustomBlackText from "../../components/Text/CustomBlackText";
import { useNavigation } from "@react-navigation/native";
import AuthForm from "../../components/AuthForm/AuthForm";
import { AuthApi } from "../../app/authApi";
import { useDispatch } from "react-redux";
import { authenticate } from "../../app/store/authSlice";

const SignUpScreen = () => {
  const { navigate } = useNavigation<StackNavigation>();
  const dispatch = useDispatch();

  const [fetchSignUp, { data, isLoading, isError }] =
    AuthApi.useFetchSignUpMutation();

  useEffect(() => {
    if (data) {
      dispatch(authenticate(data?.idToken));
    }
  });

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
    fetchSignUp(data);
  };

  const goToSignIn = () => {
    navigate("SignIn");
  };

  if (isError) {
    Alert.alert(
      "Error",
      "Could not sign up. Please check your input or try again later."
    );
  }

  return (
    <MainLayout>
      <ImageBackground
        source={require("./../../assets/images/money-bg.png")}
        resizeMode="cover"
        style={styles.image}
      >
        <View style={styles.container}>
          <CustomMediumText style={styles.title}>Sign Up</CustomMediumText>
          <AuthForm control={control} errors={errors} isLoading={isLoading} />

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
