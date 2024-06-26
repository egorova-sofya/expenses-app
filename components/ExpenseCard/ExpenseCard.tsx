import React, { FC } from "react";
import styles from "./expenseCard.style";
import { Pressable, StyleProp, View, ViewStyle, Text } from "react-native";
import CustomBlackText from "../Text/CustomBlackText";
import CustomRegularText from "../Text/CustomRegularText";
import { IExtendedExpense, StackNavigation } from "../../types";
import { COLORS } from "../../constants/theme";
import { beautifyPrice } from "../../utils/beautifyPrice";
import { useNavigation } from "@react-navigation/native";

interface Props extends React.ComponentProps<typeof View> {
  expense: IExtendedExpense;
  style?: StyleProp<ViewStyle>;
}

const ExpenseCard: FC<Props> = ({ expense, ...props }) => {
  const navigate = useNavigation<StackNavigation>();
  return (
    <View {...props} style={[styles.card, props.style]}>
      <Pressable
        android_ripple={{ color: COLORS.lightGray }}
        style={({ pressed }) =>
          pressed ? [styles.button, styles.buttonPressed] : styles.button
        }
        onPress={() =>
          navigate.navigate("ExpenseDetails", { expenseId: expense.id })
        }
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
