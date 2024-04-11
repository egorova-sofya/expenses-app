import React, { FC } from "react";
import MainLayout from "../../components/Layout/MainLayout";
import Header from "../../components/Header/Header";
import { ScrollView, View } from "react-native";
import styles from "./homeScreen.style";
import CustomMediumText from "../../components/Text/CustomMediumText";
import ExpensesList from "../../components/ExpensesList/ExpensesList";
import IconButton from "../../components/Button/IconButton";
import PlusIcon from "../../assets/images/icons/plus.svg";
import { COLORS } from "../../constants/theme";
import { RootStackParamList } from "../../types";
import { NavigationProp } from "@react-navigation/native";
import dayjs from "dayjs";

interface Props {
  navigation: NavigationProp<RootStackParamList, "Home">;
}

const HomeScreen: FC<Props> = ({ navigation }) => {
  const openAddExpense = () => {
    navigation.navigate("ManageExpense");
  };

  const timeOfTheDay = dayjs().get("hour");
  const welcomeText =
    timeOfTheDay < 12
      ? "Good Morning"
      : timeOfTheDay < 18
      ? "Good Afternoon"
      : "Good Evening";

  return (
    <MainLayout>
      <Header />
      <ScrollView>
        <View style={styles.container}>
          <CustomMediumText style={styles.welcomeText}>
            {welcomeText}
          </CustomMediumText>
          <ExpensesList />
        </View>
      </ScrollView>
      <View style={styles.addButtonContainer}>
        <IconButton
          showBg
          containerStyle={{ borderRadius: 36 }}
          style={styles.addButton}
          onPress={openAddExpense}
        >
          <PlusIcon width={20} height={20} fill={COLORS.white} />
        </IconButton>
      </View>
    </MainLayout>
  );
};

export default HomeScreen;
