import { FieldValues, UseControllerProps } from "react-hook-form";

export interface InputProps<T extends FieldValues>
  extends UseControllerProps<T> {
  label: string;
  isError?: boolean;
  keyboardType?: "default" | "number-pad" | "decimal-pad" | "numeric";
  inputMode?: "email" | "none" | "text" | "numeric" | "tel" | "url";
  editable?: boolean;
}
