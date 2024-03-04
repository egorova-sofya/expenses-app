import React from "react";
import { Image, View } from "react-native";
import styles from "./header.style";
import Notifications from "./../../assets/images/icons/notifications.svg";
import Plus from "./../../assets/images/icons/plus.svg";
import IconButton from "../Button/IconButton";
import { COLORS } from "../../constants/theme";

const Header = () => {
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
        <IconButton>
          <Plus width={22} height={22} fill={COLORS.white} />
        </IconButton>
      </View>
    </View>
  );
};

export default Header;
