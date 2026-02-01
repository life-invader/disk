export interface ServerResponse<T> {
  data: T;
  message?: string;
  isSuccess: boolean;
}

export interface ServerFailure {
  isSuccess: boolean;
  message: string;
  fieldErrors?: Record<string, string>;
}