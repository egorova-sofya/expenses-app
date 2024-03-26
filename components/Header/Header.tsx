import React, { FC } from "react";
import { Image, View } from "react-native";
import styles from "./header.style";
import LogOut from "./../../assets/images/icons/logOut.svg";
import Plus from "./../../assets/images/icons/plus.svg";
import IconButton from "../Button/IconButton";
import { COLORS } from "../../constants/theme";
import { useNavigation } from "@react-navigation/native";
import { StackNavigation } from "../../types";
import { useDispatch } from "react-redux";
import { logout } from "../../app/store/authSlice";
import Avatar from "../Avatar/Avatar";

interface Props {}

const Header: FC<Props> = ({}) => {
  const { navigate } = useNavigation<StackNavigation>();
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <Avatar />
      <View style={styles.iconsContainer}>
        <IconButton onPress={() => dispatch(logout())}>
          <LogOut width={22} height={22} fill={COLORS.white} />
        </IconButton>
        <IconButton onPress={() => navigate("ManageExpense")}>
          <Plus width={22} height={22} fill={COLORS.white} />
        </IconButton>
      </View>
    </View>
  );
};

export default Header;
