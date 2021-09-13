interface IProps {
  connectedUser: any;
}

const Dashboard: React.FC<IProps> = ({ connectedUser }) => {
  return (
    <div className='dasboard'>
      <h1>Welcome, user</h1>

      <ul>
        <li>
          <a href='/logout'>Logout</a>
        </li>
      </ul>
    </div>
  );
};

export default Dashboard;
