import React from "react";
import styles from "./tabs.style";
import { Pressable, View } from "react-native";
import CustomRegularText from "../Text/CustomRegularText";
import { COLORS } from "../../constants/theme";
import BorderGradient from "../BorderGradient/BorderGradient";
import { LinearGradient } from "expo-linear-gradient";

const Tabs = () => {
  const activeColor = [COLORS.yellow, COLORS.orange];
  const inactiveColor = [COLORS.darkGray, COLORS.darkGray];
  return (
    <View style={styles.container}>
      <Pressable style={[styles.tab, { borderColor: COLORS.orange }]}>
        <LinearGradient
          colors={activeColor}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.linearGradient}
        >
          <CustomRegularText style={styles.tabText}>Recent</CustomRegularText>
        </LinearGradient>
      </Pressable>

      <Pressable style={[styles.tab, { borderColor: COLORS.orange }]}>
        <LinearGradient
          colors={inactiveColor}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.linearGradient}
        >
          <CustomRegularText style={styles.tabText}>
            All expenses
          </CustomRegularText>
        </LinearGradient>
      </Pressable>
    </View>
  );
};

export default Tabs;
