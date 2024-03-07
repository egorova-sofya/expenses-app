import React from "react";
import ExpenseCard from "./ExpenseCard";
import { FlatList, SafeAreaView, View } from "react-native";
import styles from "./expenseCard.style";
import { COLORS } from "../../constants/theme";
import { useSelector } from "react-redux";
import { getExpenseSlice } from "../../app/store/expensesSlice";

const ExpenseCardList = () => {
  const expenses = useSelector(getExpenseSlice).expenses;
  return (
    <View style={styles.cardsList}>
      <SafeAreaView>
        <FlatList
          data={expenses}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{
            paddingBottom: 60,
          }}
          renderItem={({ item, index }) => (
            <ExpenseCard
              expense={item}
              style={{
                backgroundColor:
                  index % 2 === 0 ? COLORS.orange : COLORS.yellow,
              }}
            />
          )}
        />
      </SafeAreaView>
    </View>
  );
};

export default ExpenseCardList;
