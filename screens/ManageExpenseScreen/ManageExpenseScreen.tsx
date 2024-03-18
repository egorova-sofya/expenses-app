import React, { FC } from "react";
import MainLayout from "../../components/Layout/MainLayout";
import ManageExpenseForm from "../../components/ManageExpenseForm/ManageExpenseForm";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../../types";

interface Props {
  route: RouteProp<RootStackParamList, "ManageExpense">;
}
const ManageExpenseScreen: FC<Props> = ({ route }) => {
  const id = route.params?.expenseId;
  return (
    <MainLayout>
      <ManageExpenseForm />
    </MainLayout>
  );
};

export default ManageExpenseScreen;
