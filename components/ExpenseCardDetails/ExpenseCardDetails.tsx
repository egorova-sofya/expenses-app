import React, { FC, useEffect } from "react";
import styles from "./expenseCardDetails.style";
import { Modal, View } from "react-native";
import CustomMediumText from "../Text/CustomMediumText";
import CustomRegularText from "../Text/CustomRegularText";
import IconButton from "../Button/IconButton";
import Chevron from "./../../assets/images/icons/chevron.svg";
import Settings from "./../../assets/images/icons/settings.svg";
import { COLORS } from "../../constants/theme";
import ExpenseMenu from "../ExpenseMenu/ExpenseMenu";
import Button from "../Button/Button";
import { useDispatch, useSelector } from "react-redux";
import {
  getExpenseSlice,
  setCurrentExpense,
} from "../../app/store/expensesSlice";
import MainLayout from "../Layout/MainLayout";
import { IExpense } from "../../types";

interface Props {
  showCardDetails: boolean;
  setShowCardDetails: (value: boolean) => void;
}

const ExpenseCardDetails: FC<Props> = ({
  showCardDetails,
  setShowCardDetails,
}) => {
  const [modalVisible, setModalVisible] = React.useState(false);
  const expense = useSelector(getExpenseSlice).currentExpense;
  const currentExpense = useSelector(getExpenseSlice).currentExpense;
  const dispatch = useDispatch();
  useEffect(() => {
    currentExpense ? setShowCardDetails(true) : setShowCardDetails(false);
  }, [currentExpense]);

  const closeCardDetail = () => {
    setShowCardDetails(false);
    dispatch(setCurrentExpense(null));
  };

  if (!currentExpense) {
    <CustomMediumText>No expense selected</CustomMediumText>;
  }

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={showCardDetails}
      onRequestClose={closeCardDetail}
    >
      <MainLayout>
        <View style={styles.container}>
          <View style={styles.iconsContainer}>
            <IconButton showBg onPress={closeCardDetail}>
              <Chevron width={22} height={22} fill={COLORS.white} />
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
                ${expense?.price}
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
          <Button style={styles.button} onPress={closeCardDetail}>
            Cancel
          </Button>
          <ExpenseMenu
            expense={currentExpense as IExpense}
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
          />
        </View>
      </MainLayout>
    </Modal>
  );
};

export default ExpenseCardDetails;
