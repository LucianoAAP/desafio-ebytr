import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const { shape, string, func } = PropTypes;

const TaskForm = ({ task, editTask, toggleEditing }) => {
  const [activity, setActivity] = useState('');
  const [status, setStatus] = useState('Pendente');

  useEffect(() => {
    setActivity(task.activity);
    setStatus(task.status);
  }, [task]);

  const handleEditTask = () => {
    editTask({ ...task, activity, status });
    setActivity('');
    setStatus('Pendente');
    toggleEditing(false);
  };

  return (
    <form className="new-task-form">
      <label htmlFor="activity-input" className="new-task-label">
        Editar tarefa:
        <input
          id="activity-input"
          type="text"
          className="task-input"
          value={ activity }
          onChange={ ({ target: { value } }) => setActivity(value) }
        />
      </label>
      <label htmlFor="status" className="new-task-label">
        Status:
        <select
          id="status"
          className="status-select"
          value={ status }
          onChange={ ({ target: { value } }) => setStatus(value) }
        >
          <option value="Pendente">Pendente</option>
          <option value="Concluído">Concluído</option>
        </select>
      </label>
      <button
        type="button"
        className="add-task-button"
        disabled={ activity === '' }
        onClick={ handleEditTask }
      >
        Atualizar
      </button>
    </form>
  );
};

TaskForm.propTypes = {
  task: shape({
    id: string.isRequired,
    activity: string.isRequired,
    status: string.isRequired,
    dateCreated: string.isRequired,
  }).isRequired,
  editTask: func.isRequired,
  toggleEditing: func.isRequired,
};

export default TaskForm;
