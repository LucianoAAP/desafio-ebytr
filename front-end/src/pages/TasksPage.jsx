import React from 'react';
import { NewTaskForm, UpdateTaskForm, TaskList } from '../components';
import useTasksPage from '../hooks/useTasksPage';

const TasksPage = () => {
  const {
    sortedTasks,
    sorting,
    ordering,
    editing,
    handleSorting,
    addTask,
    toggleEditing,
    handleRemoveTask,
    editTask,
  } = useTasksPage();

  return (
    <main className="container">
      <h1>Tarefas da Ebytr</h1>
      {
        editing
          ? (
            <UpdateTaskForm
              task={ editing }
              editTask={ editTask }
              toggleEditing={ toggleEditing }
            />
          )
          : <NewTaskForm addTask={ addTask } />
      }
      <TaskList
        tasks={ sortedTasks }
        sorting={ sorting }
        ordering={ ordering }
        handleSorting={ handleSorting }
        toggleEditing={ toggleEditing }
        handleRemoveTask={ handleRemoveTask }
      />
    </main>
  );
};

export default TasksPage;
