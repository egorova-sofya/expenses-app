import { NavigationProp } from "@react-navigation/native";

export interface IExpense {
  id: number;
  title: string;
  price: number;
  date: string;
}

export type RootStackParamList = {
  Home: undefined;
  AddExpense: undefined;
  EditExpense: undefined | { expenseId: number };
  ExpenseDetails: undefined | { expenseId: number };
};

export type StackNavigation = NavigationProp<RootStackParamList>;
