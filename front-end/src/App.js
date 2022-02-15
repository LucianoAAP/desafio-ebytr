import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import TasksPage from './pages/TasksPage';

const App = () => (
  <Routes>
    <Route exact path="/tasks" element={ <TasksPage /> } />
    <Route exact path="/" element={ <Navigate to="/tasks" /> } />
  </Routes>
);

export default App;
