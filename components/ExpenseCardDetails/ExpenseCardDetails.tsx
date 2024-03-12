import React, { FC, useState } from "react";
import styles from "./expenseCardDetails.style";
import { View } from "react-native";
import CustomMediumText from "../Text/CustomMediumText";
import CustomRegularText from "../Text/CustomRegularText";
import IconButton from "../Button/IconButton";
import CloseIcon from "./../../assets/images/icons/x.svg";
import Settings from "./../../assets/images/icons/settings.svg";
import { COLORS } from "../../constants/theme";
import ExpenseMenu from "../ExpenseMenu/ExpenseMenu";
import Button from "../Button/Button";
import { useSelector } from "react-redux";
import { getExpenseSlice } from "../../app/store/expensesSlice";
import MainLayout from "../Layout/MainLayout";
import {
  IExtendedExpense,
  RootStackParamList,
  StackNavigation,
} from "../../types";
import { beautifyPrice } from "../../utils/price";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";

interface Props {}

const ExpenseCardDetails: FC<Props> = ({}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const expenses = useSelector(getExpenseSlice).expenses;
  const route = useRoute<RouteProp<RootStackParamList, "ExpenseDetails">>();
  const navigation = useNavigation<StackNavigation>();

  const id = route.params?.expenseId;
  const expense = expenses?.find((item) => item.id === id);

  const goBack = () => {
    navigation.goBack();
  };

  if (!expense) {
    <CustomMediumText>No expense selected</CustomMediumText>;
  }

  return (
    <MainLayout>
      <View style={styles.container}>
        <View style={styles.iconsContainer}>
          <IconButton showBg onPress={goBack}>
            <CloseIcon width={22} height={22} fill={COLORS.white} />
          </IconButton>
          <IconButton showBg onPress={() => setModalVisible(!modalVisible)}>
            <Settings width={22} height={22} fill={COLORS.white} />
          </IconButton>
        </View>
        <CustomMediumText style={styles.title}>
          {expense?.title}
        </CustomMediumText>
        <View style={styles.detailsContainer}>
          <View>
            <CustomRegularText style={styles.detailTitle}>
              Expense
            </CustomRegularText>
            <CustomMediumText style={styles.value}>
              {expense?.price && beautifyPrice(expense?.price)}
            </CustomMediumText>
          </View>
          <View>
            <CustomRegularText style={styles.detailTitle}>
              Date
            </CustomRegularText>
            <CustomMediumText style={styles.value}>
              {expense?.date}
            </CustomMediumText>
          </View>
        </View>
        <Button style={styles.button} onPress={goBack}>
          Cancel
        </Button>
        <ExpenseMenu
          expense={expense as IExtendedExpense}
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
        />
      </View>
    </MainLayout>
  );
};

export default ExpenseCardDetails;
