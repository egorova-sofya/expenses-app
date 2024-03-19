import React from "react";
import { IExpense, StackNavigation } from "../../types";
import { View } from "react-native";
import TextInput from "../Inputs/TextInput";
import styles from "./ManageExpenseForm.style";
import Button from "../Button/Button";
import IconButton from "../Button/IconButton";
import { useNavigation } from "@react-navigation/native";
import CloseIcon from "./../../assets/images/icons/x.svg";
import { COLORS } from "../../constants/theme";
import CustomMediumText from "../Text/CustomMediumText";
import { useForm } from "react-hook-form";

interface Props {
  defaultValues?: IExpense;
  onSubmit: (values: IExpense) => void;
}

const ManageExpenseForm: React.FC<Props> = ({ defaultValues, onSubmit }) => {
  const { title, price, date } = defaultValues || {};
  const navigation = useNavigation<StackNavigation>();
  const isEdit = !!defaultValues;
  const mainTitle = isEdit ? "Edit expense" : "Add expense";

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
  console.log("errors", errors);

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
        <TextInput
          rules={{ required: true }}
          isError={!!errors.date}
          label="Date"
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
      </View>
      <Button
        style={styles.button}
        onPress={handleSubmit((data) =>
          onSubmitFn({ ...data, price: +data.price })
        )}
      >
        Save
      </Button>
    </View>
  );
};

export default ManageExpenseForm;
