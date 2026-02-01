export interface IUser {
  id: string;
  email: string;
  name: string;
  secondName: string;
  diskSpace: number;
  files: [];
}

export type ISessionState = {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: IUser | null;
};