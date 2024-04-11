import React, { FC, useEffect, useState } from "react";
import MainLayout from "../../components/Layout/MainLayout";
import Header from "../../components/Header/Header";
import { ScrollView, View } from "react-native";
import styles from "./homeScreen.style";
import CustomMediumText from "../../components/Text/CustomMediumText";
import CustomRegularText from "../../components/Text/CustomRegularText";
import Tabs from "../../components/Tabs/Tabs";
import ExpenseCardList from "../../components/ExpenseCard/ExpenseCardList";
import IconButton from "../../components/Button/IconButton";
import PlusIcon from "../../assets/images/icons/plus.svg";
import { COLORS } from "../../constants/theme";
import { IExtendedExpense, RootStackParamList } from "../../types";
import { NavigationProp } from "@react-navigation/native";
import LoadingOverlay from "../../components/StatusComponents/LoadingOverlay";
import { fetchExpenses } from "../../utils/expensesDatabase";
import { useIsFocused } from "@react-navigation/native";
import dayjs from "dayjs";

interface Props {
  navigation: NavigationProp<RootStackParamList, "Home">;
}

const HomeScreen: FC<Props> = ({ navigation }) => {
  const [expenses, setExpenses] = useState<IExtendedExpense[] | null>(null);
  const isFocused = useIsFocused();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    async function fetchExpensesHandler() {
      const expenses = await fetchExpenses();
      setExpenses(expenses);
      setIsLoading(false);
    }
    fetchExpensesHandler();
  }, [isFocused]);

  const getExpensesLast7Days = () => {
    const today = dayjs(new Date());
    const sevenDaysAgo = dayjs(new Date()).subtract(7, "day");

    return expenses?.filter((expense) => {
      const expenseDate = dayjs(expense.date);
      return expenseDate >= sevenDaysAgo && expenseDate <= today;
    });
  };

  const expensesLast7Days = getExpensesLast7Days();

  const expensesSum = expensesLast7Days
    ? expensesLast7Days.reduce((acc, expense) => {
        return acc + expense.price;
      }, 0)
    : 0;

  const openAddExpense = () => {
    navigation.navigate("ManageExpense");
  };

  // if (isError) {
  //   return <ErrorOverlay />;
  // }

  const timeOfTheDay = dayjs().get("hour");
  const welcomeText =
    timeOfTheDay < 12
      ? "Good Morning"
      : timeOfTheDay < 18
      ? "Good Afternoon"
      : "Good Evening";

  return (
    <MainLayout>
      <Header />
      <ScrollView>
        <View style={styles.container}>
          <CustomMediumText style={styles.welcomeText}>
            {welcomeText},
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
                ${expensesSum.toFixed(2)}
              </CustomRegularText>
              <CustomRegularText style={styles.descriptionValue}>
                Last 7 days
              </CustomRegularText>
            </View>
          </View>
          <Tabs />
          {isLoading ? (
            <LoadingOverlay />
          ) : !expenses ? (
            <CustomMediumText>No data</CustomMediumText>
          ) : (
            <ExpenseCardList expenses={expenses} />
          )}
        </View>
      </ScrollView>
      <View style={styles.addButtonContainer}>
        <IconButton
          showBg
          containerStyle={{ borderRadius: 36 }}
          style={styles.addButton}
          onPress={openAddExpense}
        >
          <PlusIcon width={20} height={20} fill={COLORS.white} />
        </IconButton>
      </View>
    </MainLayout>
  );
};

export default HomeScreen;
