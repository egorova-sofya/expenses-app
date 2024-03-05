import React, { FC } from "react";
import styles from "./expenseMenu.style";
import { Modal, Pressable, TouchableOpacity, View } from "react-native";
import DeleteIcon from "./../../assets/images/icons/delete.svg";
import EditIcon from "./../../assets/images/icons/edit.svg";
import CustomMediumText from "../Text/CustomMediumText";
import { COLORS } from "../../constants/theme";

interface Props {
  modalVisible: boolean;
  setModalVisible: (value: boolean) => void;
}

const ExpenseMenu: FC<Props> = ({ modalVisible, setModalVisible }) => {
  const closeModal = () => {
    console.log("😵‍💫");
    setModalVisible(false);
  };
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={closeModal}
    >
      <TouchableOpacity
        style={styles.modalContainer}
        onPress={() => setModalVisible(false)}
      >
        <TouchableOpacity style={styles.modal} activeOpacity={1}>
          <View style={styles.menu}>
            <Pressable style={styles.button}>
              <EditIcon width={32} height={32} fill={COLORS.black} />
              <CustomMediumText style={styles.text}>
                Edit expense
              </CustomMediumText>
            </Pressable>
            <Pressable style={styles.button}>
              <DeleteIcon width={32} height={32} fill={COLORS.red} />
              <CustomMediumText style={[styles.text, { color: COLORS.red }]}>
                Delete expense
              </CustomMediumText>
            </Pressable>
          </View>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
};

export default ExpenseMenu;
