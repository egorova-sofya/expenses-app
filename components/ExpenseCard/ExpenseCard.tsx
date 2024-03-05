import React, { FC } from "react";
import styles from "./expenseCard.style";
import { Pressable, StyleProp, View, ViewStyle } from "react-native";
import CustomBlackText from "../Text/CustomBlackText";
import CustomRegularText from "../Text/CustomRegularText";
import { IExpense } from "../../types";
import { COLORS } from "../../constants/theme";

interface Props extends React.ComponentProps<typeof View> {
  expense: IExpense;
  style?: StyleProp<ViewStyle>;
}

const ExpenseCard: FC<Props> = ({ expense, ...props }) => {
  return (
    <View {...props} style={[styles.card, props.style]}>
      <Pressable
        android_ripple={{ color: COLORS.lightGray }}
        style={({ pressed }) =>
          pressed ? [styles.button, styles.buttonPressed] : styles.button
        }
      >
        <View style={styles.content}>
          <View style={styles.titleContainer}>
            <View style={styles.separator}></View>
            <View>
              <CustomBlackText style={styles.title}>
                Some bananas
              </CustomBlackText>
              <CustomRegularText style={styles.date}>
                2024-1-5
              </CustomRegularText>
            </View>
          </View>
          <CustomBlackText style={styles.price}>$16.5</CustomBlackText>
        </View>
      </Pressable>
    </View>
  );
};

export default ExpenseCard;
