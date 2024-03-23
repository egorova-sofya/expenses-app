import {
  Montserrat_400Regular,
  Montserrat_500Medium,
  Montserrat_900Black,
} from "@expo-google-fonts/montserrat";
import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import { Provider } from "react-redux";
import { store } from "./app/store/store";
import HomeScreen from "./screens/HomeScreen/HomeScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ManageExpenseScreen from "./screens/ManageExpenseScreen/ManageExpenseScreen";
import { RootStackParamList } from "./types";
import { NavigationContainer } from "@react-navigation/native";
import { COLORS } from "./constants/theme";
import ExpenseDetails from "./screens/ExpenseDetails/ExpenseDetails";
import LoadingOverlay from "./components/StatusComponents/LoadingOverlay";
import ErrorOverlay from "./components/StatusComponents/ErrorOverlay";

const Stack = createNativeStackNavigator<RootStackParamList>();

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
    <Provider store={store}>
      <StatusBar style="light" />
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerShown: false,
            contentStyle: {
              backgroundColor: COLORS.black,
            },
          }}
        >
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="ManageExpense" component={ManageExpenseScreen} />
          <Stack.Screen
            name="ExpenseDetails"
            component={ExpenseDetails}
            options={{ presentation: "modal" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
