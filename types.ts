import { NavigationProp } from "@react-navigation/native";

export interface IExpense {
  title: string;
  price: number;
  date: string;
}

export interface IFirebaseExpense {
  [key: string]: IExpense;
}
export interface IExtendedExpense extends IExpense {
  id: string;
}

export type RootStackParamList = {
  Home: undefined;
  ManageExpense: undefined | { expenseId?: string };
  ExpenseDetails: undefined | { expenseId: string };
};

export type StackNavigation = NavigationProp<RootStackParamList>;
