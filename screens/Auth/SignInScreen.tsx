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

const SignInScreen = () => {
  const { navigate } = useNavigation<StackNavigation>();
  const dispatch = useDispatch();

  const [fetchSignIn, { data, isLoading, isError, reset }] =
    AuthApi.useFetchSignInMutation();

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
    fetchSignIn(data);
  };

  const goToSignUp = () => {
    navigate("SignUp");
  };

  if (isError) {
    Alert.alert(
      "Error",
      "Could not sign in. Please check your credentials or try again later."
    );
    reset();
  }

  return (
    <MainLayout>
      <ImageBackground
        source={require("./../../assets/images/money-bg.png")}
        resizeMode="cover"
        style={styles.image}
      >
        <View style={styles.container}>
          <CustomMediumText style={styles.title}>Sign In</CustomMediumText>
          <View style={styles.inputsContainer}>
            <AuthForm isLoading={isLoading} control={control} errors={errors} />
          </View>

          <View style={styles.buttonsContainer}>
            <Button style={styles.button} onPress={handleSubmit(onSubmitFn)}>
              Sign In
            </Button>
            <View style={styles.textContainer}>
              <CustomRegularText style={styles.text}>
                Don’t have an account?
              </CustomRegularText>
              <Pressable onPress={goToSignUp} style={styles.link}>
                <CustomBlackText style={styles.linkText}>
                  Sign Up
                </CustomBlackText>
              </Pressable>
            </View>
          </View>
        </View>
      </ImageBackground>
    </MainLayout>
  );
};

export default SignInScreen;
