import React from 'react';
import logo from './logo.svg';
import './App.css';
import Dashboard from './pages/dashboard/Dashboard';
import { Route, Routes } from 'react-router-dom';
import User from './pages/users/User';
import Companies from './pages/companies/Companies';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Surveys from './pages/surveys/surveys';
import SpecificSurvey from './pages/specificSurvey/specificSurvey';
import Login from './pages/login/login';




function App() {
  return (
    <div className="App">
      <ToastContainer/>
      <Routes>
        <Route path='/' element={<Login/>}></Route>
        <Route element={<Dashboard/>}>
          <Route path="users" element={<User/>}></Route>
          <Route path="companies" element={<Companies/>}></Route>
          <Route path="surveys" element={<Surveys/>}></Route>
          <Route path="surveys/:id" element={<SpecificSurvey/>}></Route>
       </Route>
      </Routes>
    </div>
  );
}

export default App;
