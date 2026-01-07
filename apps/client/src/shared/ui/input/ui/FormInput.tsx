import { useFormContext, type FieldValues } from 'react-hook-form';
import { Input } from './Input.tsx';
import type { FormInputProps } from '../model/types.ts';

export const FormInput = <T extends FieldValues>({ name, ...props }: FormInputProps<T>) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<T>();
  const errorMsg = errors[name]?.message as string | undefined;

  return <Input errorMsg={errorMsg} {...register(name)} {...props} />;
};
