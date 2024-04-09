import {
  Montserrat_400Regular,
  Montserrat_500Medium,
  Montserrat_900Black,
} from "@expo-google-fonts/montserrat";
import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import { Provider, useDispatch, useSelector } from "react-redux";
import { store } from "./app/store/store";
import HomeScreen from "./screens/HomeScreen/HomeScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ManageExpenseScreen from "./screens/ManageExpenseScreen/ManageExpenseScreen";
import { RootStackParamList } from "./types";
import { NavigationContainer } from "@react-navigation/native";
import { COLORS } from "./constants/theme";
import ExpenseDetailsScreen from "./screens/ExpenseDetailsScreen/ExpenseDetailsScreen";
import LoadingOverlay from "./components/StatusComponents/LoadingOverlay";
import ErrorOverlay from "./components/StatusComponents/ErrorOverlay";
import SignInScreen from "./screens/Auth/SignInScreen";
import SignUpScreen from "./screens/Auth/SignUpScreen";
import { authenticate, getAuthSlice } from "./app/store/authSlice";
import { useCallback, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SplashScreen from "expo-splash-screen";
import { init } from "./utils/database";
import CustomMediumText from "./components/Text/CustomMediumText";

SplashScreen.preventAutoHideAsync();

const Stack = createNativeStackNavigator<RootStackParamList>();

const screenOptions = {
  headerShown: false,
  contentStyle: {
    backgroundColor: COLORS.black,
  },
};

function AuthStack() {
  return (
    <Stack.Navigator initialRouteName="SignIn" screenOptions={screenOptions}>
      <Stack.Screen name="SignIn" component={SignInScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
    </Stack.Navigator>
  );
}

function AuthenticatedStack() {
  return (
    <Stack.Navigator initialRouteName="Home" screenOptions={screenOptions}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="ManageExpense" component={ManageExpenseScreen} />

      <Stack.Screen
        name="ExpenseDetails"
        component={ExpenseDetailsScreen}
        options={{ presentation: "modal" }}
      />
    </Stack.Navigator>
  );
}

function Navigation(props: { onLayoutRootView: () => void }) {
  const isAuth = !!useSelector(getAuthSlice).token;
  return (
    <NavigationContainer onReady={props.onLayoutRootView}>
      {/* {!isAuth && <AuthStack />} */}
      {/* {isAuth && <AuthenticatedStack />} */}
      <AuthenticatedStack />
    </NavigationContainer>
  );
}
function Root() {
  const [appIsReady, setAppIsReady] = useState(false);
  const [dbIsReady, setDbIsReady] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    init()
      .then(() => {
        setDbIsReady(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    const fetchAuth = async () => {
      try {
        const storedToken = await AsyncStorage.getItem("token");

        if (storedToken) {
          dispatch(authenticate(storedToken));
        }
      } catch (error) {
        console.error("Error fetching auth: ", error);
      } finally {
        setAppIsReady(true);
      }
    };

    fetchAuth();
  }, [dispatch]);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady && dbIsReady) {
      try {
        await SplashScreen.hideAsync();
      } catch (error) {
        console.error("Error hiding splash screen: ", error);
      }
    }
  }, [appIsReady, dbIsReady]);

  if (!appIsReady || !dbIsReady) {
    return null;
  }

  return <Navigation onLayoutRootView={onLayoutRootView} />;
}

export default function App() {
  let [fontsLoaded, error] = useFonts({
    Montserrat_400Regular,
    Montserrat_500Medium,
    Montserrat_900Black,
  });

  if (error) {
    return <ErrorOverlay />;
  }

  if (!fontsLoaded) {
    return <LoadingOverlay />;
  }

  return (
    <>
      <StatusBar style="light" />
      <Provider store={store}>
        <Root />
      </Provider>
    </>
  );
}
