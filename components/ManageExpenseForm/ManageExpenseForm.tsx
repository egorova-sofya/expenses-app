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

interface Props {
  defaultValues?: IExpense;
  onSubmit: (values: IExpense) => void;
}

const ManageExpenseForm: React.FC<Props> = ({ defaultValues, onSubmit }) => {
  const { title, price, date } = defaultValues || {};
  const navigation = useNavigation<StackNavigation>();
  const isEdit = !!defaultValues;
  const mainTitle = isEdit ? "Edit expense" : "Add expense";

  const [formValues, setFormValues] = React.useState({
    title: title || "",
    price: price || "",
    date: date || "",
  });

  const setFormValue = (key: keyof IExpense, value: string) => {
    setFormValues({
      ...formValues,
      [key]: value,
    });
  };

  const goBack = () => {
    navigation.goBack();
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
          value={formValues.title}
          label="Title"
          onChangeFn={(value) => setFormValue("title", value)}
        />
        <TextInput
          value={formValues.date}
          label="Date"
          onChangeFn={(value) => setFormValue("date", value)}
        />
        <TextInput
          value={formValues.price.toString()}
          label="Amount"
          onChangeFn={(value) => setFormValue("price", value)}
          keyboardType="numeric"
        />
      </View>
      <Button
        style={styles.button}
        onPress={() => {
          onSubmit({ ...formValues, price: Number(formValues.price) });
          goBack();
        }}
      >
        Save
      </Button>
    </View>
  );
};

export default ManageExpenseForm;
