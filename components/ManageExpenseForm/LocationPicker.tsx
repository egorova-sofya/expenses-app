import React, { FC } from "react";
import styles from "./manageExpenseForm.style";
import CustomRegularText from "../Text/CustomRegularText";
import { Pressable, View } from "react-native";

interface Props {
  onPress: () => void;
}

const LocationPicker: FC<Props> = ({ onPress }) => {
  return (
    <View>
      <CustomRegularText style={styles.locationLabel}>
        Location
      </CustomRegularText>
      <Pressable onPress={onPress}>
        <CustomRegularText style={styles.locationBtnText}>
          Choose location
        </CustomRegularText>
      </Pressable>
    </View>
  );
};

export default LocationPicker;
