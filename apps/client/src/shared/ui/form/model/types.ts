import type { FieldValues, SubmitHandler, UseFormReturn } from "react-hook-form";

export interface FormProps<T extends FieldValues> {
  children: React.ReactNode;
  submitBtnLabel: string;
  onSubmit: SubmitHandler<T>;
  methods: UseFormReturn<T>;
  isLoading?: boolean;
  errorMsg?: string | null;
}