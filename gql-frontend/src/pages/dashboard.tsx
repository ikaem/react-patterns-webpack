import DashboardLayout from '../components/users/dashboard/DashboardLayout';
import UserProvider from '../context/user';

const Dashboard = () => {
  return (
    <UserProvider>
      <DashboardLayout />
    </UserProvider>
  );
};

export default Dashboard;
