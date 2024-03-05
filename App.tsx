import {
  Montserrat_400Regular,
  Montserrat_500Medium,
  Montserrat_900Black,
} from "@expo-google-fonts/montserrat";
import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import CustomMediumText from "./components/Text/CustomMediumText";
import MainLayout from "./components/Layout/MainLayout";
import Header from "./components/Header/Header";
import CustomRegularText from "./components/Text/CustomRegularText";
import { COLORS } from "./constants/theme";
import Tabs from "./components/Tabs/Tabs";
import ExpenseCardList from "./components/ExpenseCard/ExpenseCardList";
import ExpenseCardDetails from "./components/ExpenseCardDetails/ExpenseCardDetails";
import { useState } from "react";

export default function App() {
  const [showCardDetails, setShowCardDetails] = useState(false);
  let [fontsLoaded] = useFonts({
    Montserrat_400Regular,
    Montserrat_500Medium,
    Montserrat_900Black,
  });

  if (!fontsLoaded) {
    return <Text>Loading...</Text>;
  }

  return (
    <MainLayout>
      <StatusBar style="light" />
      <Header />
      <View style={styles.container}>
        <CustomMediumText style={styles.welcomeText}>
          Good Morning,
        </CustomMediumText>
        <View style={styles.descriptionContainer}>
          <View>
            <CustomRegularText style={styles.descriptionTitle}>
              Sofi
            </CustomRegularText>
            <CustomRegularText style={styles.descriptionValue}>
              Dec. 12, 2024
            </CustomRegularText>
          </View>
          <View>
            <CustomRegularText style={styles.descriptionTitle}>
              $335.65
            </CustomRegularText>
            <CustomRegularText style={styles.descriptionValue}>
              Last 7 days
            </CustomRegularText>
          </View>
        </View>
        <Tabs />
        <ExpenseCardList />
      </View>
      <ExpenseCardDetails
        showCardDetails={showCardDetails}
        setShowCardDetails={setShowCardDetails}
      />
    </MainLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  welcomeText: {
    fontSize: 62,
    lineHeight: 61,
    marginTop: 40,
    marginBottom: 16,
  },
  descriptionContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 28,
  },
  descriptionTitle: {
    fontSize: 18,
    lineHeight: 22,
  },
  descriptionValue: {
    fontSize: 12,
    lineHeight: 15,
    color: COLORS.foregroundGray,
  },
});
