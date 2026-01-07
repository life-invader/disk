import type { RootState } from "@shared/types/store";

export const selectIsAuth = (state: RootState) => state.auth.isAuth;
