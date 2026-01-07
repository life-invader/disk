import type { FieldValues, SubmitHandler, UseFormProps } from "react-hook-form";

export interface FormProps<T extends FieldValues> {
  children: React.ReactNode;
  submitBtnLabel: string;
  onSubmit: SubmitHandler<T>;
  options: UseFormProps<T>;
}