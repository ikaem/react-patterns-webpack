import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className='home'>
      <h1>Home</h1>

      <ul>
        <li>
          <a href='/dashboard'>Go to dashboarddd</a>
          {/* <Link to='/dashboard'>Go to dashboarddd</Link> */}
        </li>
      </ul>
    </div>
  );
};

export default Home;
