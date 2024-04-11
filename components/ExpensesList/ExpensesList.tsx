import React, { FC, useEffect, useState } from "react";
import ExpenseCard from "../ExpenseCard/ExpenseCard";
import { SafeAreaView, View } from "react-native";
import styles from "./expensesList.style";
import { COLORS } from "../../constants/theme";
import { IExtendedExpense } from "../../types";
import CustomRegularText from "../Text/CustomRegularText";
import dayjs from "dayjs";
import Tabs from "../Tabs/Tabs";
import { useIsFocused } from "@react-navigation/native";
import { fetchExpenses } from "../../utils/expensesDatabase";
import LoadingOverlay from "../StatusComponents/LoadingOverlay";
import CustomMediumText from "../Text/CustomMediumText";
import { beautifyPrice } from "../../utils/beautifyPrice";

interface Props {}

const ExpensesList: FC<Props> = () => {
  const [expenses, setExpenses] = useState<IExtendedExpense[] | null>(null);
  const isFocused = useIsFocused();
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = React.useState<"recent" | "all">("recent");

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

  const expensesLast7DaysSum = expensesLast7Days
    ? expensesLast7Days.reduce((acc, expense) => {
        return acc + expense.price;
      }, 0)
    : 0;
  const totalExpenses = expenses
    ? expenses?.reduce((acc, expense) => {
        return acc + expense.price;
      }, 0)
    : 0;

  const showRecentExpenses = activeTab === "recent";
  const finalExpenses = showRecentExpenses ? expensesLast7Days : expenses;
  return (
    <>
      <View style={styles.descriptionContainer}>
        <View>
          <CustomRegularText style={styles.descriptionTitle}>
            Today
          </CustomRegularText>
          <CustomRegularText style={styles.descriptionValue}>
            {dayjs(new Date()).format("MMM D, YYYY")}
          </CustomRegularText>
        </View>
        <View>
          <CustomRegularText style={styles.descriptionTitle}>
            {showRecentExpenses
              ? beautifyPrice(expensesLast7DaysSum)
              : beautifyPrice(totalExpenses)}
          </CustomRegularText>
          <CustomRegularText style={styles.descriptionValue}>
            {showRecentExpenses ? "Last 7 days" : "Total"}
          </CustomRegularText>
        </View>
      </View>
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
      {isLoading ? (
        <LoadingOverlay />
      ) : !expenses || expenses.length === 0 ? (
        <View style={styles.noDataContainer}>
          <CustomMediumText style={styles.noDataAccentText}>
            ¯\_(ツ)_/¯
          </CustomMediumText>
          <CustomMediumText style={styles.noDataText}>No data</CustomMediumText>
        </View>
      ) : (
        <View style={styles.cardsList}>
          <SafeAreaView>
            {finalExpenses?.map((item, index) => (
              <ExpenseCard
                style={{
                  backgroundColor:
                    index % 2 === 0 ? COLORS.orange : COLORS.yellow,
                }}
                expense={item}
                key={item.id}
              />
            ))}
          </SafeAreaView>
        </View>
      )}
    </>
  );
};

export default ExpensesList;
