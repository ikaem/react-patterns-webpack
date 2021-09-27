import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import HomePage from './pages/home';
import IssuesPage from './pages/issues';
import DashboardPage from './pages/dashboard';
import LoginPage from './pages/login';
import FormsPage from './pages/forms';
import Error404 from './pages/error404';
import IssueProvider from './contexts/Issue';
import PokedexContainer from './pages/pokedex';

const AppRoutes = () => (
  <IssueProvider url='https://api.github.com/repos/ContentPI/ContentPI/issues'>
    <h1>No</h1>
    <Switch>
      <Route path='/' component={HomePage} exact />
      <Route path='/issues' component={IssuesPage} exact />
      <Route path='/pokedex' component={PokedexContainer} exact />
      <Route path='/forms' component={FormsPage} exact />

      {/* <Route path='/dashboard' component={DashboardPage} exact />
        <Route path='/login' component={LoginPage} exact /> */}
      <Route component={Error404} />
    </Switch>
  </IssueProvider>
);

export default AppRoutes;
