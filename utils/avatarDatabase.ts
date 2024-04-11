import * as SQLite from "expo-sqlite";
import { SQLError } from "expo-sqlite";

const database = SQLite.openDatabase("avatar.db");

export function initAvatarDB() {
  const promise = new Promise<void>((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS avatar (
            id INTEGER PRIMARY KEY NOT NULL,
            uri TEXT NOT NULL
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

export function insertAvatar(avatar: string) {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `INSERT OR REPLACE INTO avatar (id, uri) VALUES (?, ?)`,
        [1, avatar],
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

export function fetchAvatar(): Promise<string | null> {
  const promise = new Promise<string | null>((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM avatar",
        [],
        (_, result) => {
          const avatar = result.rows._array[0]?.uri;
          resolve(avatar);
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
