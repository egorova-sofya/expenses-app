import React, { FC, useEffect, useState } from "react";
import MainLayout from "../../components/Layout/MainLayout";
import ManageExpenseForm from "../../components/ManageExpenseForm/ManageExpenseForm";
import { RouteProp } from "@react-navigation/native";
import { IExpense, IExtendedExpense, RootStackParamList } from "../../types";
import LoadingOverlay from "../../components/StatusComponents/LoadingOverlay";
import {
  editExpense,
  fetchExpenseDetails,
  insertExpense,
} from "../../utils/expensesDatabase";

interface Props {
  route: RouteProp<RootStackParamList, "ManageExpense">;
}
const ManageExpenseScreen: FC<Props> = ({ route }) => {
  const id = route.params?.expenseId;

  const [expense, setExpense] = useState<IExtendedExpense>();
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    async function loadExpenseData() {
      if (id) {
        const expense: IExtendedExpense = await fetchExpenseDetails(id);
        setExpense(expense);
      }
    }

    loadExpenseData();
    setIsLoading(false);
  }, [id]);

  const onSubmit = async (value: IExpense) => {
    if (id) {
      setIsLoading(true);
      async function editExpenseData() {
        if (!id) return;
        editExpense({ ...value, id: id });
        setIsLoading(false);
      }

      editExpenseData();
    } else {
      async function createExpenseHandler(expense: IExpense) {
        await insertExpense(expense);
      }
      createExpenseHandler(value);
    }
  };
  if (isLoading || (id && !expense)) {
    return <LoadingOverlay />;
  }

  return (
    <MainLayout>
      <ManageExpenseForm onSubmit={onSubmit} defaultValues={expense} />
    </MainLayout>
  );
};

export default ManageExpenseScreen;
