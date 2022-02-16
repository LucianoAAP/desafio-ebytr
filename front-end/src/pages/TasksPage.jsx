import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { NewTaskForm, TaskList } from '../components';
import { getTasks, createTask } from '../services/tasksApi';

const TasksPage = () => {
  const [tasks, setTasks] = useState([]);
  const [sortedTasks, setSortedTasks] = useState([]);
  const [sorting, setSorting] = useState('activity');
  const [ordering, setOrdering] = useState('asc');

  const socket = io('http://localhost:3001');
  socket.on('tasksUpdated', () => {
    getTasks().then((result) => {
      setTasks(result);
    });
  });

  useEffect(() => {
    getTasks().then((result) => {
      setTasks(result);
      setSortedTasks(result);
    });
  }, []);

  useEffect(() => {
    const MINUS_ONE = -1;

    const newTasks = tasks.sort((a, b) => {
      const first = a[sorting].toLowerCase();
      const second = b[sorting].toLowerCase();
      if (first < second) return MINUS_ONE;
      if (first > second) return 1;
      return 0;
    });

    const orderedTasks = ordering === 'desc' ? newTasks.reverse() : newTasks;

    setSortedTasks(orderedTasks);
  }, [tasks, sorting, ordering]);

  const handleSorting = async (sortingCriterium, orderCriterium) => {
    const MINUS_ONE = -1;
    setSorting(sortingCriterium);
    setOrdering(orderCriterium);
    const newTasks = tasks.sort((a, b) => {
      const first = a[sortingCriterium].toLowerCase();
      const second = b[sortingCriterium].toLowerCase();
      if (first < second) return MINUS_ONE;
      if (first > second) return 1;
      return 0;
    });

    const orderedTasks = orderCriterium === 'desc' ? newTasks.reverse() : newTasks;

    setSortedTasks(orderedTasks);
  };

  const addTask = async (task) => {
    await createTask(task);
    socket.emit('tasksUpdated');
  };

  return (
    <main className="container">
      <h1>Tarefas da Ebytr</h1>
      <NewTaskForm addTask={ addTask } />
      <TaskList
        tasks={ sortedTasks }
        sorting={ sorting }
        ordering={ ordering }
        handleSorting={ handleSorting }
      />
    </main>
  );
};

export default TasksPage;
