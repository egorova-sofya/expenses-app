import React, { FC, ReactNode } from "react";
import styles from "./bottomMenu.style";
import { Modal, Pressable, TouchableOpacity, View } from "react-native";
import CustomMediumText from "../Text/CustomMediumText";
import { COLORS } from "../../constants/theme";

interface IMenuOption {
  title: string;
  action: () => void;
  icon: ReactNode;
  appearance: "default" | "destructive";
  isLoading?: boolean;
}

interface Props {
  options: IMenuOption[];
  modalVisible: boolean;
  setModalVisible: (value: boolean) => void;
}

const BottomMenu: FC<Props> = ({ options, modalVisible, setModalVisible }) => {
  const closeModal = () => {
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
            {options.map((option) => (
              <Pressable
                key={option.title}
                onPress={option.action}
                style={[styles.button, option.isLoading && { opacity: 0.5 }]}
                disabled={option.isLoading}
              >
                {option.icon}
                <CustomMediumText
                  style={[
                    styles.text,
                    option.appearance === "destructive" && {
                      color: COLORS.red,
                    },
                  ]}
                >
                  {option.title}
                </CustomMediumText>
              </Pressable>
            ))}
          </View>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
};

export default BottomMenu;
