import React from 'react';
import './App.css';
import { HomePage } from './HomePage';
import { SetUpHabitPage } from './SetUpHabitPage';
import { CalendarPage } from './CalendarPage';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import RecordPage from './RecordPage';
import SignUp from './SignUp';
import Login from './Login';
import Logout from './Logout';
import ChooseSkill from './ChooseSkill';
import Header from './Header';
import ChartsPage from './ChartsPage';
import GamifyingPage from './GamifyingPage';

const NoMatch = ({ location }) => (
  <div>
    <Header />
    <h3>No page found for <code>{location.pathname}</code></h3>
  </div>
)

function App() {

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route exact path='/sign_up/' component={SignUp} />
        <Route exact path='/log_in/' component={Login} />
        <Route exact path='/log_out/' component={Logout} />
        <Route exact path='/choose_skill/' component={ChooseSkill} />
        <Route exact path='/set_up_habit/' component={SetUpHabitPage} />
        <Route exact path='/calendar/' component={CalendarPage} />
        <Route exact path='/record/' component={RecordPage} />
        <Route exact path='/charts/' component={ChartsPage} />
        <Route exact path='/gamifying/' component={GamifyingPage} />
        <Route component={NoMatch} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;