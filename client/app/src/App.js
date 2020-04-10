import React from 'react';
import './App.css';
import { HomePage } from './HomePage'; 
import { SetUpHabitPage } from './SetUpHabitPage';
import { Calendar } from './Calendar';
import { BrowserRouter, Route } from 'react-router-dom'
import Record from './Record';
import SignUp from './SignUp';

function App() {
  return (
    <BrowserRouter>
      <Route exact path='/' component={HomePage} />
      <Route exact path='/set_up_habit/' component={SetUpHabitPage} />
      <Route exact path='/calendar/' component={Calendar} />
      <Route exact path='/sign_up/' component={SignUp} />
      <Route exact path='/record/' component={Record} />
    </BrowserRouter>
  );
}

export default App;