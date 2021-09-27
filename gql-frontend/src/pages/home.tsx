import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className='home'>
      <h1>Home</h1>
      What
      <ul>
        <li>
          {/* <a href='/dashboard'>Go to dashboarddd</a> */}
          <Link to='/dashboard'>Go to dashboarddd</Link>
        </li>

        <li>
          <Link to='/issues'>Go to issues</Link>
        </li>

        <li>
          <Link to='/pokedex'>Go to pokemon</Link>
        </li>
        <li>
          <Link to='/forms'>Go to forms</Link>
        </li>
      </ul>
    </div>
  );
};

export default Home;
