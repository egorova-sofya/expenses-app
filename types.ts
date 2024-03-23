import { NavigationProp } from "@react-navigation/native";

export interface IExpense {
  title: string;
  price: number;
  date: string;
}

export interface IAuthValues {
  email: string;
  password: string;
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
  SignIn: undefined;
  SignUp: undefined;
};

export type StackNavigation = NavigationProp<RootStackParamList>;
