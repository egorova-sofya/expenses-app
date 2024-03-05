import React, { FC } from "react";
import styles from "./expenseMenu.style";
import { Modal, Pressable, TouchableOpacity, View } from "react-native";
import DeleteIcon from "./../../assets/images/icons/delete.svg";
import EditIcon from "./../../assets/images/icons/edit.svg";
import CustomMediumText from "../Text/CustomMediumText";
import { COLORS } from "../../constants/theme";
import { IExpense } from "../../types";
import { useDispatch } from "react-redux";
import {
  deleteExpense,
  editExpense,
  setCurrentExpense,
} from "../../app/store/expensesSlice";

interface Props {
  expense: IExpense;
  modalVisible: boolean;
  setModalVisible: (value: boolean) => void;
}

const ExpenseMenu: FC<Props> = ({ expense, modalVisible, setModalVisible }) => {
  const closeModal = () => {
    setModalVisible(false);
  };

  const dispatch = useDispatch();

  const editExpenseFn = () => {
    dispatch(editExpense(expense));
  };

  const deleteExpenseFn = () => {
    dispatch(setCurrentExpense(null));
    dispatch(deleteExpense({ id: expense.id }));
  };
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={closeModal}
    >
      <TouchableOpacity
        style={styles.modalContainer}
        onPress={() => setModalVisible(false)}
      >
        <TouchableOpacity style={styles.modal} activeOpacity={1}>
          <View style={styles.menu}>
            <Pressable onPress={editExpenseFn} style={styles.button}>
              <EditIcon width={32} height={32} fill={COLORS.black} />
              <CustomMediumText style={styles.text}>
                Edit expense
              </CustomMediumText>
            </Pressable>
            <Pressable onPress={deleteExpenseFn} style={styles.button}>
              <DeleteIcon width={32} height={32} fill={COLORS.red} />
              <CustomMediumText style={[styles.text, { color: COLORS.red }]}>
                Delete expense
              </CustomMediumText>
            </Pressable>
          </View>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
};

export default ExpenseMenu;
