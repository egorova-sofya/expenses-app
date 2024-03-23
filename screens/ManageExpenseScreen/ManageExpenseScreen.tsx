import React, { FC, useEffect } from "react";
import MainLayout from "../../components/Layout/MainLayout";
import ManageExpenseForm from "../../components/ManageExpenseForm/ManageExpenseForm";
import { RouteProp } from "@react-navigation/native";
import { IExpense, RootStackParamList } from "../../types";
import { useDispatch, useSelector } from "react-redux";
import {
  addExpense,
  editExpense,
  getExpenseSlice,
} from "../../app/store/expensesSlice";
import { API } from "../../app/api";

interface Props {
  route: RouteProp<RootStackParamList, "ManageExpense">;
}
const ManageExpenseScreen: FC<Props> = ({ route }) => {
  const id = route.params?.expenseId;
  const expenses = useSelector(getExpenseSlice).expenses;
  const dispatch = useDispatch();
  const expense = expenses?.find((item) => item.id === id);

  const [
    fetchAddExpense,
    { isLoading: isAddExpenseLoading, isError: isAddExpenseError },
  ] = API.useFetchAddExpenseMutation();
  const [
    fetchEditExpense,
    { isLoading: isEditExpenseLoading, isError: isEditExpenseError },
  ] = API.useFetchEditExpenseMutation();

  const onSubmit = async (value: IExpense) => {
    if (id) {
      fetchEditExpense({ id: id, data: value });
      dispatch(editExpense({ ...value, id: id }));
    } else {
      const result = await fetchAddExpense(value);
      "data" in result &&
        dispatch(addExpense({ ...value, id: result?.data.name }));
    }
  };

  return (
    <MainLayout>
      <ManageExpenseForm onSubmit={onSubmit} defaultValues={expense} />
    </MainLayout>
  );
};

export default ManageExpenseScreen;
