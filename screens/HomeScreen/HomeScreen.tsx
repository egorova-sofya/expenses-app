import React, { FC, useEffect } from "react";
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
import { RootStackParamList } from "../../types";
import { NavigationProp } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { getExpenseSlice, setExpenses } from "../../app/store/expensesSlice";
import { API } from "../../app/api";
import LoadingOverlay from "../../components/StatusComponents/LoadingOverlay";
import ErrorOverlay from "../../components/StatusComponents/ErrorOverlay";

interface Props {
  navigation: NavigationProp<RootStackParamList, "Home">;
}

const HomeScreen: FC<Props> = ({ navigation }) => {
  const expenses = useSelector(getExpenseSlice).expenses;
  const dispatch = useDispatch();

  const getExpensesLast7Days = () => {
    const today = new Date();
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(today.getDate() - 7);

    return expenses?.filter((expense) => {
      const expenseDate = new Date(expense.date);
      return expenseDate >= sevenDaysAgo && expenseDate <= today;
    });
  };

  const { isLoading, isError, data } = API.useFetchGetExpensesQuery();

  useEffect(() => {
    if (data) {
      dispatch(setExpenses(data));
    }
  }, [data]);

  const expensesLast7Days = getExpensesLast7Days();

  const expensesSum = expensesLast7Days
    ? expensesLast7Days.reduce((acc, expense) => {
        return acc + expense.price;
      }, 0)
    : 0;

  const openAddExpense = () => {
    navigation.navigate("ManageExpense");
  };

  if (isError) {
    return <ErrorOverlay />;
  }

  return (
    <MainLayout>
      <Header />
      <ScrollView>
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
                ${expensesSum.toFixed(2)}
              </CustomRegularText>
              <CustomRegularText style={styles.descriptionValue}>
                Last 7 days
              </CustomRegularText>
            </View>
          </View>
          <Tabs />
          {isLoading ? <LoadingOverlay /> : <ExpenseCardList />}
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
