import { Provider } from 'react-redux';
import { store } from '@app/store/index';

interface IProps {
  children: React.ReactNode;
}

export const StoreProvider = ({ children }: IProps) => {
  return <Provider store={store}>{children}</Provider>;
};
