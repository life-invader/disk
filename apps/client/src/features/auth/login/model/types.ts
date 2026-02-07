import type { IUser } from "@/entities/session";
import type { LoginFormValues } from "./schema";

export interface ILoginFormProps {
  onSuccess?: (...args: unknown[]) => void;
  onError?: (...args: unknown[]) => void;
}

type IFieldErrors = Partial<LoginFormValues>;

export interface ILoginApiSuccess {
  isSuccess: true;
  data: {
    user: IUser
  }
}

export interface ILoginApiError {
  isSuccess: false;
  message: string;
  fieldErrors?: IFieldErrors;
}

export type RegisterResult = ILoginApiSuccess | ILoginApiError;