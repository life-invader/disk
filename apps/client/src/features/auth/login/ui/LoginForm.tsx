import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@shared/ui/form';
import { FormInput } from '@shared/ui/input';
import { applyServerErrors } from '@/shared/lib/form/applyServerErrors';
import { loginSchema, type LoginFormValues } from '../model/schema';
import { useLogin } from '../model/useLogin';
import type { ILoginFormProps } from '../model/types';

export const LoginForm = ({ onSuccess, onError }: ILoginFormProps) => {
  const methods = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });
  const { register, isLoading, error } = useLogin();

  const onSubmit: SubmitHandler<LoginFormValues> = async (data) => {
    const response = await register(data);

    if (response.isSuccess) {
      onSuccess?.();
    } else {
      onError?.();
      applyServerErrors(methods, response.fieldErrors);
    }
  };

  return (
    <Form<LoginFormValues>
      methods={methods}
      onSubmit={onSubmit}
      submitBtnLabel="Войти"
      isLoading={isLoading}
      errorMsg={error}>
      <Form.Body>
        <FormInput<LoginFormValues>
          name="email"
          placeholder="Введите адрес электронной почты..."
          autoComplete="email"
        />
        <FormInput<LoginFormValues>
          name="password"
          placeholder="Введите пароль..."
          autoComplete="new-password"
          type="password"
        />
      </Form.Body>
    </Form>
  );
};
