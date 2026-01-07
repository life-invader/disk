import { type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@shared/ui/form';
import { FormInput } from '@shared/ui/input';
import { loginSchema, type LoginFormValues } from '../model/schema';
import { useRegister } from '../model/useRegister';

export const RegisterForm = () => {
  const { register } = useRegister();
  const onSubmit: SubmitHandler<LoginFormValues> = (data) => {
    register(data);
  };

  return (
    <Form<LoginFormValues>
      onSubmit={onSubmit}
      submitBtnLabel="Зарегистрироваться"
      options={{
        resolver: zodResolver(loginSchema),
      }}>
      <Form.Body>
        <FormInput<LoginFormValues>
          name="name"
          placeholder="Введите имя..."
          autoComplete="given-name"
        />
        <FormInput<LoginFormValues> name="secondName" placeholder="Введите фамилию..." />
        <FormInput<LoginFormValues> name="email" placeholder="Введите адрес электронной почты..." />
        <FormInput<LoginFormValues> name="password" placeholder="Введите пароль..." />
      </Form.Body>
    </Form>
  );
};
