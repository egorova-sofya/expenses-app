import React, { FC } from "react";
import DeleteIcon from "./../../assets/images/icons/delete.svg";
import EditIcon from "./../../assets/images/icons/edit.svg";
import { COLORS } from "../../constants/theme";
import { IExtendedExpense, StackNavigation } from "../../types";
import { useDispatch } from "react-redux";
import { deleteExpense } from "../../app/store/expensesSlice";
import { useNavigation } from "@react-navigation/native";
import { API } from "../../app/api";
import ErrorOverlay from "../StatusComponents/ErrorOverlay";
import BottomMenu from "../BottomMenu/BottomMenu";

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

  const { navigate, addListener } = useNavigation<StackNavigation>();

  React.useEffect(() => {
    const unsubscribe = addListener("blur", () => {
      setModalVisible(false);
    });
    return unsubscribe;
  }, [navigate]);

  const deleteExpenseFn = async () => {
    await fetchDeleteExpenses({ id: expense.id });
    dispatch(deleteExpense({ id: expense.id }));
    navigate("Home");
  };

  if (isError) {
    return <ErrorOverlay />;
  }
  return (
    <BottomMenu
      modalVisible={modalVisible}
      setModalVisible={setModalVisible}
      options={[
        {
          title: "Edit expense",
          action: () => navigate("ManageExpense", { expenseId: expense.id }),
          icon: <EditIcon width={32} height={32} fill={COLORS.black} />,
          appearance: "default",
          isLoading: isLoading,
        },
        {
          title: "Delete expense",
          action: deleteExpenseFn,
          icon: <DeleteIcon width={32} height={32} fill={COLORS.red} />,
          appearance: "destructive",
          isLoading: isLoading,
        },
      ]}
    />
  );
};

export default ExpenseMenu;
