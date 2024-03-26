import React from "react";
import ExpenseCard from "./ExpenseCard";
import { SafeAreaView, View } from "react-native";
import styles from "./expenseCard.style";
import { COLORS } from "../../constants/theme";
import { useSelector } from "react-redux";
import { getExpenseSlice } from "../../app/store/expensesSlice";

const ExpenseCardList = () => {
  const expenses = useSelector(getExpenseSlice).expenses;
  return (
    <View style={styles.cardsList}>
      <SafeAreaView>
        {expenses?.map((item, index) => (
          <ExpenseCard
            style={{
              backgroundColor: index % 2 === 0 ? COLORS.orange : COLORS.yellow,
            }}
            expense={item}
            key={item.id}
          />
        ))}
      </SafeAreaView>
    </View>
  );
};

export default ExpenseCardList;
