import { useContext } from 'react';
import { UserContext } from '../../context/user';
import Login from './Login';

interface IProps {
  currentUrl: string;
}

const LoginLayout: React.FC<IProps> = ({ currentUrl }) => {
  const { login } = useContext(UserContext);

  return <Login login={login} currentUrl={currentUrl}></Login>;
};

export default LoginLayout;
