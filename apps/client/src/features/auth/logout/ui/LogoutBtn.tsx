import { Button } from '@/shared/ui/button';
import { useAppDispatch } from '@/shared/lib/storeHooks';
import { logout } from '../model/logoutService';
import type { PropsType } from '../model/types';

export const LogoutBtn = ({ text }: PropsType) => {
  const dispatch = useAppDispatch();

  const onClick = () => {
    dispatch(logout());
  };

  return <Button onClick={onClick}>{text}</Button>;
};
