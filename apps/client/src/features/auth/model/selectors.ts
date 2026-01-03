import type { IAuthState } from "./authSlice"

export const selectIsAuth = (state: IAuthState) => state.isAuth;
