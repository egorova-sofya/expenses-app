import React, { FC } from "react";
import styles from "./manageExpenseForm.style";
import CustomRegularText from "../Text/CustomRegularText";
import { Pressable, View } from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "../../types";

interface Props {
  onPress: () => void;
}

const LocationPicker: FC<Props> = ({ onPress }) => {
  const route = useRoute<RouteProp<RootStackParamList, "ManageExpense">>();

  const { latitude, longitude } = route.params || {};
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
