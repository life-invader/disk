import { useAppSelector } from "@shared/lib/storeHooks";
import { selectIsAuth } from "../model/selectors";

export const useAuth = () => {
  return useAppSelector(selectIsAuth);
}