import React, { FC, useState } from "react";
import MainLayout from "../../components/Layout/MainLayout";
import Header from "../../components/Header/Header";
import { View } from "react-native";
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
import { useSelector } from "react-redux";
import { getExpenseSlice } from "../../app/store/expensesSlice";

interface Props {
  navigation: NavigationProp<RootStackParamList, "Home">;
}

const HomeScreen: FC<Props> = ({ navigation }) => {
  const [showCardDetails, setShowCardDetails] = useState(false);
  const expenses = useSelector(getExpenseSlice).expenses;

  const expensesSum = expenses
    ? expenses.slice(0, 7).reduce((acc, expense) => {
        return acc + expense.price;
      }, 0)
    : 0;

  const openAddExpense = () => {
    navigation.navigate("AddExpense");
  };

  return (
    <MainLayout>
      <Header />
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
        <ExpenseCardList />
      </View>

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
