import React, { FC } from "react";
import styles from "./expenseMenu.style";
import { Modal, Pressable, TouchableOpacity, View } from "react-native";
import DeleteIcon from "./../../assets/images/icons/delete.svg";
import EditIcon from "./../../assets/images/icons/edit.svg";
import CustomMediumText from "../Text/CustomMediumText";
import { COLORS } from "../../constants/theme";
import { IExtendedExpense, StackNavigation } from "../../types";
import { useDispatch } from "react-redux";
import { deleteExpense } from "../../app/store/expensesSlice";
import { useNavigation } from "@react-navigation/native";
import { API } from "../../app/api";
import ErrorOverlay from "../StatusComponents/ErrorOverlay";

interface Props {
  expense: IExtendedExpense;
  modalVisible: boolean;
  setModalVisible: (value: boolean) => void;
}

const ExpenseMenu: FC<Props> = ({ expense, modalVisible, setModalVisible }) => {
  const closeModal = () => {
    setModalVisible(false);
  };

  const [fetchDeleteExpenses, { isLoading, isError }] =
    API.useFetchDeleteExpensesMutation();

  const dispatch = useDispatch();

  const { navigate, addListener, goBack } = useNavigation<StackNavigation>();

  React.useEffect(() => {
    const unsubscribe = addListener("blur", () => {
      setModalVisible(false);
    });
    return unsubscribe;
  }, [navigate]);

  const deleteExpenseFn = async () => {
    await fetchDeleteExpenses({ id: expense.id });
    dispatch(deleteExpense({ id: expense.id }));
    goBack();
  };

  if (isError) {
    return <ErrorOverlay />;
  }
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
            <Pressable
              onPress={() =>
                navigate("ManageExpense", { expenseId: expense.id })
              }
              style={[styles.button, isLoading && { opacity: 0.5 }]}
              disabled={isLoading}
            >
              <EditIcon width={32} height={32} fill={COLORS.black} />
              <CustomMediumText style={styles.text}>
                Edit expense
              </CustomMediumText>
            </Pressable>
            <Pressable
              onPress={deleteExpenseFn}
              style={[styles.button, isLoading && { opacity: 0.5 }]}
              disabled={isLoading}
            >
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
