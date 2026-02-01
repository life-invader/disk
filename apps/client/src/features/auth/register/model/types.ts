import type { IUser } from "@/entities/session";
import type { RegisterFormValues } from "./schema";

export interface IRegisterFormProps {
  onSuccess?: (...args: unknown[]) => void;
  onError?: (...args: unknown[]) => void;
}

type IFieldErrors = Partial<RegisterFormValues>;

export interface IRegisterApiSuccess {
  isSuccess: true;
  data: {
    user: IUser
  }
}

export interface IRegisterApiError {
  isSuccess: false;
  message: string;
  fieldErrors?: IFieldErrors;
}

export type RegisterResult = IRegisterApiSuccess | IRegisterApiError;