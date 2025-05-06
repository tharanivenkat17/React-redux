import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import UsersList from '../../features/Users/UsersList';
import LoginAdmin from '../../features/FetchEmployeeData/LoginAdmin/LoginAdmin';
import EmployeeList from '../../features/FetchEmployeeData/EmployeeList';
import Counter from '../../features/Counter/Counter';
import Form from '../../features/Form/Form';
import './Nav.css';

const Nav: React.FC = () => {
  return (
    <div>
      <nav>
        <div className='links'>
          <Link to="/">Home</Link> {' '}
          <Link to="/form">Employee Data Form</Link> {' '}
          <Link to="/loginadmin">Employees List</Link> {' '}
          <Link to="/users">Static Users Data</Link> {' '}
          <Link to="/counter">Counter App</Link>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<h1>Welcome to React Redux</h1>} />
        <Route path="/users" element={<UsersList />} />
        <Route path="/loginadmin" element={<LoginAdmin />} />
        <Route path="/employees" element={<EmployeeList />} />
        <Route path="/counter" element={<Counter />} />
        <Route path="/form" element={<Form />} />
      </Routes>
    </div>
  );
};

export default Nav;
