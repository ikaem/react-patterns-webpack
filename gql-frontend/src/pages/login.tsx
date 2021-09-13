import { isBrowser } from '@contentpi/lib';
import LoginLayout from '../components/users/LoginLayout';
import UserProvider from '../context/user';

interface IProps {
  currentUrl: string;
}

const Login: React.FC<IProps> = ({
  currentUrl = isBrowser()
    ? window.location.search.replace('?redirectTo=', '')
    : '',
}) => {
  return (
    <UserProvider page='login'>
      <LoginLayout currentUrl={currentUrl} />
    </UserProvider>
  );
};

export default Login;
