import React, { useState } from "react";
import { IExpense, StackNavigation } from "../../types";
import { Alert, View } from "react-native";
import TextInput from "../Inputs/TextInput";
import Button from "../Button/Button";
import IconButton from "../Button/IconButton";
import { useNavigation } from "@react-navigation/native";
import CloseIcon from "./../../assets/images/icons/x.svg";
import { COLORS } from "../../constants/theme";
import CustomMediumText from "../Text/CustomMediumText";
import { useForm } from "react-hook-form";
import DateInput from "../Inputs/DateInput";
import styles from "./manageExpenseForm.style";
import BottomMenu from "../BottomMenu/BottomMenu";
import MapIcon from "./../../assets/images/icons/map.svg";
import MapPinIcon from "./../../assets/images/icons/mapPin.svg";
import LocationPicker from "./LocationPicker";
import {
  getCurrentPositionAsync,
  useForegroundPermissions,
  PermissionStatus,
} from "expo-location";
import useLocation from "../../hooks/useLocation";

interface Props {
  defaultValues?: IExpense;
  onSubmit: (values: IExpense) => void;
}

const ManageExpenseForm: React.FC<Props> = ({ defaultValues, onSubmit }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const { title, price, date } = defaultValues || {};
  const navigation = useNavigation<StackNavigation>();
  const isEdit = !!defaultValues;
  const mainTitle = isEdit ? "Edit expense" : "Add expense";
  const { getLocation, pickOnMap } = useLocation();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: title || "",
      price: price?.toString() || "",
      date: date || "",
    },
  });

  const goBack = () => {
    navigation.goBack();
  };

  const onSubmitFn = (data: IExpense) => {
    data && onSubmit(data);
    goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <IconButton showBg onPress={goBack}>
          <CloseIcon width={22} height={22} fill={COLORS.white} />
        </IconButton>
      </View>
      <CustomMediumText style={styles.title}>{mainTitle}</CustomMediumText>
      <View style={styles.inputsContainer}>
        <TextInput
          rules={{ required: true }}
          isError={!!errors.title}
          label="Title"
          name="title"
          control={control}
        />

        <DateInput
          rules={{ required: true }}
          isError={!!errors.date}
          label="Date (YYYY/MM/DD)"
          name="date"
          control={control}
        />
        <TextInput
          label="Amount"
          isError={!!errors.price}
          name="price"
          control={control}
          rules={{ required: true }}
          keyboardType="numeric"
        />
        <LocationPicker onPress={() => setModalVisible(true)} />
      </View>
      <Button
        style={styles.button}
        onPress={handleSubmit((data) =>
          onSubmitFn({ ...data, price: +data.price })
        )}
      >
        Save
      </Button>
      <BottomMenu
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        options={[
          {
            title: "Locate user",
            action: () => {
              getLocation();
            },
            icon: <MapPinIcon width={32} height={32} fill={COLORS.black} />,
            appearance: "default",
          },
          {
            title: "Pick on map",
            action: () => {
              pickOnMap();
            },
            icon: <MapIcon width={32} height={32} fill={COLORS.black} />,
            appearance: "default",
          },
        ]}
      />
    </View>
  );
};

export default ManageExpenseForm;
