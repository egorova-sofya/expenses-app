import React, { FC } from "react";
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

  const [fetchAddExpense, { data }] = API.useFetchAddExpenseMutation();

  const onSubmit = (value: IExpense) => {
    if (id) {
      dispatch(editExpense({ ...value, id: id }));
    } else {
      dispatch(addExpense({ ...value, id: Date.now() }));
      fetchAddExpense(value);
    }
  };

  return (
    <MainLayout>
      <ManageExpenseForm onSubmit={onSubmit} defaultValues={expense} />
    </MainLayout>
  );
};

export default ManageExpenseScreen;
