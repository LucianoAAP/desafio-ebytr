import React, { useState, useEffect } from 'react';
import { NewTaskForm, TaskList } from '../components';
import { getTasks } from '../services/tasksApi';

const TasksPage = () => {
  const [tasks, setTasks] = useState([]);
  const [sortedTasks, setSortedTasks] = useState([]);
  const [sorting, setSorting] = useState('activity');
  const [ordering, setOrdering] = useState('asc');

  useEffect(() => {
    getTasks().then((result) => {
      setTasks(result);
      setSortedTasks(result);
    });
  }, []);

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

  return (
    <main className="container">
      <h1>Tarefas da Ebytr</h1>
      <NewTaskForm />
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
