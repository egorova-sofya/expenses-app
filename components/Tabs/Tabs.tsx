import React, { FC } from "react";
import styles from "./tabs.style";
import { Pressable, View } from "react-native";
import CustomRegularText from "../Text/CustomRegularText";
import { COLORS } from "../../constants/theme";
import { LinearGradient } from "expo-linear-gradient";

interface Props {
  activeTab: "recent" | "all";
  setActiveTab: (tab: "recent" | "all") => void;
}

const Tabs: FC<Props> = ({ activeTab, setActiveTab }) => {
  const activeColor = [COLORS.yellow, COLORS.orange];
  const inactiveColor = [COLORS.darkGray, COLORS.darkGray];

  const handleTabPress = (tab: "recent" | "all") => {
    setActiveTab(tab);
  };

  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => handleTabPress("recent")}
        style={[styles.tab, { borderColor: COLORS.orange }]}
      >
        <LinearGradient
          colors={activeTab === "recent" ? activeColor : inactiveColor}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.linearGradient}
        >
          <CustomRegularText style={styles.tabText}>Recent</CustomRegularText>
        </LinearGradient>
      </Pressable>

      <Pressable
        onPress={() => handleTabPress("all")}
        style={[styles.tab, { borderColor: COLORS.orange }]}
      >
        <LinearGradient
          colors={activeTab === "all" ? activeColor : inactiveColor}
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
