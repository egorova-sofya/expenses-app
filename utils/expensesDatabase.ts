import * as SQLite from "expo-sqlite";
import { IExpense, IExtendedExpense } from "../types";
import { SQLError } from "expo-sqlite";

const database = SQLite.openDatabase("expenses.db");

export function initExpensesDB() {
  const promise = new Promise<void>((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS expenses (
          id INTEGER PRIMARY KEY NOT NULL,
          title TEXT NOT NULL,
          price REAL NOT NULL,
          date TEXT NOT NULL
        )`,
        [],
        () => {
          resolve();
        },
        (_, error: SQLError) => {
          reject(error);
          return true;
        }
      );
    });
  });

  return promise;
}

export function insertExpense(expense: IExpense) {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO expenses (title, price, date) VALUES (?, ?, ?)`,
        [expense.title, expense.price, expense.date],
        (_, result) => {
          resolve(result);
        },
        (_, error: SQLError) => {
          reject(error);
          return true;
        }
      );
    });
  });

  return promise;
}

export function fetchExpenses(): Promise<IExtendedExpense[]> {
  const promise = new Promise<IExtendedExpense[]>((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM expenses",
        [],
        (_, result) => {
          const expenses = result.rows._array;
          resolve(expenses as IExtendedExpense[]);
        },
        (_, error: SQLError) => {
          reject(error);
          return true;
        }
      );
    });
  });

  return promise;
}

export function fetchExpenseDetails(id: string): Promise<IExtendedExpense> {
  const promise = new Promise<IExtendedExpense>((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM expenses WHERE id = ?",
        [id],
        (_, result) => {
          resolve(result.rows._array[0]);
        },
        (_, error: SQLError) => {
          reject(error);
          return true;
        }
      );
    });
  });

  return promise;
}

export function editExpense(
  updatedExpenseData: IExtendedExpense
): Promise<void> {
  const promise = new Promise<void>((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `UPDATE expenses SET title = ?, price = ?, date = ? WHERE id = ?`,
        [
          updatedExpenseData.title,
          updatedExpenseData.price,
          updatedExpenseData.date,
          updatedExpenseData.id,
        ],
        () => {
          resolve();
        },
        (_, error: SQLError) => {
          reject(error);
          return true;
        }
      );
    });
  });

  return promise;
}

export function deleteExpense(id: string) {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        "DELETE FROM expenses WHERE id = ?",
        [id],
        (_, result) => {
          resolve({ message: "Expense deleted successfully" });
        },
        (_, error: SQLError) => {
          reject(error);
          return true;
        }
      );
    });
  });
  return promise;
}
