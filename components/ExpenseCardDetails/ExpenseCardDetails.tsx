import React, { FC } from "react";
import styles from "./expenseCardDetails.style";
import { Modal, View } from "react-native";
import CustomMediumText from "../Text/CustomMediumText";
import CustomRegularText from "../Text/CustomRegularText";
import IconButton from "../Button/IconButton";
import Chevron from "./../../assets/images/icons/chevron.svg";
import Settings from "./../../assets/images/icons/settings.svg";
import { COLORS } from "../../constants/theme";
import ExpenseMenu from "../ExpenseMenu/ExpenseMenu";
import Button from "../Button/Button";

interface Props {
  showCardDetails: boolean;
  setShowCardDetails: (value: boolean) => void;
}

const ExpenseCardDetails: FC<Props> = ({
  showCardDetails,
  setShowCardDetails,
}) => {
  const [modalVisible, setModalVisible] = React.useState(false);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={showCardDetails}
      onRequestClose={() => setShowCardDetails(false)}
    >
      <View style={styles.container}>
        <View style={styles.iconsContainer}>
          <IconButton showBg onPress={() => setShowCardDetails(false)}>
            <Chevron width={22} height={22} fill={COLORS.white} />
          </IconButton>
          <IconButton showBg onPress={() => setModalVisible(!modalVisible)}>
            <Settings width={22} height={22} fill={COLORS.white} />
          </IconButton>
        </View>
        <CustomMediumText style={styles.title}>Some bananas</CustomMediumText>
        <View style={styles.detailsContainer}>
          <View>
            <CustomRegularText style={styles.detailTitle}>
              Expense
            </CustomRegularText>
            <CustomMediumText style={styles.value}>$16.5</CustomMediumText>
          </View>
          <View>
            <CustomRegularText style={styles.detailTitle}>
              Date
            </CustomRegularText>
            <CustomMediumText style={styles.value}>2024-1-5</CustomMediumText>
          </View>
        </View>
        <Button style={styles.button}>Cancel</Button>
        <ExpenseMenu
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
        />
      </View>
    </Modal>
  );
};

export default ExpenseCardDetails;
