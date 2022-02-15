import React from 'react';
import { NewTaskForm, TaskList } from '../components';

const TasksPage = () => (
  <main className="container">
    <h1>Tarefas da Ebytr</h1>
    <NewTaskForm />
    <TaskList />
  </main>
);

export default TasksPage;
