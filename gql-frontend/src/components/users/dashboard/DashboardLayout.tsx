import { useContext } from 'react';
import { UserContext } from '../../../contexts/user';
import Dashboard from './Dashboard';

const DashboardLayout: React.FC = () => {
  const { connectedUser } = useContext(UserContext);
  if (!connectedUser) return <div />;

  return <Dashboard connectedUser={connectedUser} />;
};

export default DashboardLayout;
