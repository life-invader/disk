import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@shared/ui/form';
import { FormInput } from '@shared/ui/input';
import { applyServerErrors } from '@/shared/lib/form/applyServerErrors';
import { registerSchema, type RegisterFormValues } from '../model/schema';
import { useRegister } from '../model/useRegister';
import type { IRegisterFormProps } from '../model/types';

export const RegisterForm = ({ onSuccess, onError }: IRegisterFormProps) => {
  const methods = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  });
  const { register, isLoading, error } = useRegister();

  const onSubmit: SubmitHandler<RegisterFormValues> = async (data) => {
    const response = await register(data);

    if (response.isSuccess) {
      onSuccess?.();
    } else {
      onError?.();
      applyServerErrors(methods, response.fieldErrors);
    }
  };

  return (
    <Form<RegisterFormValues>
      methods={methods}
      onSubmit={onSubmit}
      submitBtnLabel="Зарегистрироваться"
      isLoading={isLoading}
      errorMsg={error}>
      <Form.Body>
        <FormInput<RegisterFormValues>
          name="name"
          placeholder="Введите имя..."
          autoComplete="given-name"
        />
        <FormInput<RegisterFormValues>
          name="secondName"
          placeholder="Введите фамилию..."
          autoComplete="family-name"
        />
        <FormInput<RegisterFormValues>
          name="email"
          placeholder="Введите адрес электронной почты..."
          autoComplete="email"
        />
        <FormInput<RegisterFormValues>
          name="password"
          placeholder="Введите пароль..."
          autoComplete="new-password"
        />
      </Form.Body>
    </Form>
  );
};
