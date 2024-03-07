import React, { FC } from "react";
import styles from "./expenseCard.style";
import { Pressable, StyleProp, View, ViewStyle } from "react-native";
import CustomBlackText from "../Text/CustomBlackText";
import CustomRegularText from "../Text/CustomRegularText";
import { IExpense } from "../../types";
import { COLORS } from "../../constants/theme";
import { useDispatch } from "react-redux";
import { setCurrentExpense } from "../../app/store/expensesSlice";
import { beautifyPrice } from "../../utils/price";

interface Props extends React.ComponentProps<typeof View> {
  expense: IExpense;
  style?: StyleProp<ViewStyle>;
}

const ExpenseCard: FC<Props> = ({ expense, ...props }) => {
  const dispatch = useDispatch();
  return (
    <View {...props} style={[styles.card, props.style]}>
      <Pressable
        android_ripple={{ color: COLORS.lightGray }}
        style={({ pressed }) =>
          pressed ? [styles.button, styles.buttonPressed] : styles.button
        }
        onPress={() => dispatch(setCurrentExpense(expense))}
      >
        <View style={styles.content}>
          <View style={styles.titleContainer}>
            <View style={styles.separator}></View>
            <View>
              <CustomBlackText style={styles.title}>
                {expense.title}
              </CustomBlackText>
              <CustomRegularText style={styles.date}>
                {expense.date}
              </CustomRegularText>
            </View>
          </View>
          <CustomBlackText style={styles.price}>
            {beautifyPrice(expense.price)}
          </CustomBlackText>
        </View>
      </Pressable>
    </View>
  );
};

export default ExpenseCard;
