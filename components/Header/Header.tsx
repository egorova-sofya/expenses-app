import React, { FC } from "react";
import { Image, View } from "react-native";
import styles from "./header.style";
import Notifications from "./../../assets/images/icons/notifications.svg";
import Plus from "./../../assets/images/icons/plus.svg";
import IconButton from "../Button/IconButton";
import { COLORS } from "../../constants/theme";
import { useDispatch } from "react-redux";
import { addExpense } from "../../app/store/expensesSlice";
import { useNavigation } from "@react-navigation/native";
import { StackNavigation } from "../../types";

interface Props {}

const Header: FC<Props> = ({}) => {
  const dispatch = useDispatch();
  const { navigate } = useNavigation<StackNavigation>();

  const createExpense = () => {
    dispatch(
      addExpense({
        title: "New Expense",
        date: '2022-01-01"',
        id: Math.floor(Math.random() * 1000),
        price: 1000,
      })
    );
  };
  return (
    <View style={styles.container}>
      <Image
        style={styles.avatar}
        source={require("../../assets/images/avatar.jpg")}
      />
      <View style={styles.iconsContainer}>
        <IconButton>
          <Notifications width={22} height={22} fill={COLORS.white} />
        </IconButton>
        <IconButton onPress={() => navigate("ManageExpense")}>
          <Plus width={22} height={22} fill={COLORS.white} />
        </IconButton>
      </View>
    </View>
  );
};

export default Header;
