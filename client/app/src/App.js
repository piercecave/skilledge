import React from 'react';
import './App.css';
import { HomePage } from './HomePage'; 
import { SetUpHabitPage } from './SetUpHabitPage';
import { Calendar } from './Calendar';
import { BrowserRouter, Route } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Route exact path='/' component={HomePage} />
      <Route exact path='/set_up_habit/' component={SetUpHabitPage} />
      <Route exact path='/calendar/' component={Calendar} />
    </BrowserRouter>
  );
}

export default App;