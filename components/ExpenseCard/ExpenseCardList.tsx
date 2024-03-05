import React from "react";
import ExpenseCard from "./ExpenseCard";
import expenses from "./../../data/expenses.json";
import { FlatList, SafeAreaView, View } from "react-native";
import styles from "./expenseCard.style";
import { COLORS } from "../../constants/theme";

const ExpenseCardList = () => {
  return (
    <View style={styles.cardsList}>
      <SafeAreaView>
        <FlatList
          data={expenses}
          keyExtractor={(item) => item.id.toString()}
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
