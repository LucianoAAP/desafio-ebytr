import { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { getTasks, createTask, updateTask, removeTask } from '../services/tasksApi';

const API_URL = 'http://localhost:3001/';
const TASKS_UPDATED = 'tasksUpdated';
const MINUS_ONE = -1;
const socket = io(API_URL);

const useTasksPage = () => {
  const [tasks, setTasks] = useState([]);
  const [sortedTasks, setSortedTasks] = useState([]);
  const [sorting, setSorting] = useState('activity');
  const [ordering, setOrdering] = useState('asc');
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    getTasks().then((result) => {
      setTasks(result);
      setSortedTasks(result);
    });

    socket.on('tasksUpdated', () => {
      getTasks().then((result) => {
        setTasks(result);
      });
    });
  }, []);

  useEffect(() => {
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
    socket.emit(TASKS_UPDATED);
  };

  const toggleEditing = (task) => setEditing(task);

  const handleRemoveTask = async (id) => {
    await removeTask(id);
    socket.emit(TASKS_UPDATED);
  };

  const editTask = async (task) => {
    await updateTask(task);
    socket.emit(TASKS_UPDATED);
  };

  return {
    sortedTasks,
    sorting,
    ordering,
    editing,
    handleSorting,
    addTask,
    toggleEditing,
    handleRemoveTask,
    editTask,
  };
};

export default useTasksPage;
