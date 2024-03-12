import { NavigationProp } from "@react-navigation/native";

export interface IExpense {
  title: string;
  price: number;
  date: string;
}
export interface IExtendedExpense extends IExpense {
  id: number;
}

export type RootStackParamList = {
  Home: undefined;
  AddExpense: undefined;
  EditExpense: undefined | { expenseId: number };
  ExpenseDetails: undefined | { expenseId: number };
};

export type StackNavigation = NavigationProp<RootStackParamList>;
