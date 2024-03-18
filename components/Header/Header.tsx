import React, { FC } from "react";
import { Image, View } from "react-native";
import styles from "./header.style";
import Notifications from "./../../assets/images/icons/notifications.svg";
import Plus from "./../../assets/images/icons/plus.svg";
import IconButton from "../Button/IconButton";
import { COLORS } from "../../constants/theme";
import { useNavigation } from "@react-navigation/native";
import { StackNavigation } from "../../types";

interface Props {}

const Header: FC<Props> = ({}) => {
  const { navigate } = useNavigation<StackNavigation>();

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
