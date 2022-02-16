import React, { useState } from 'react';
import PropTypes from 'prop-types';

const TaskForm = ({ addTask }) => {
  const [activity, setActivity] = useState('');
  const [status, setStatus] = useState('Pendente');

  const handleAddTask = () => {
    addTask({ activity, status });
    setActivity('');
    setStatus('Pendente');
  };

  return (
    <form className="new-task-form">
      <label htmlFor="activity-input" className="new-task-label">
        Nova tarefa:
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
          <option value="Em andamento">Em andamento</option>
          <option value="Concluído">Concluído</option>
        </select>
      </label>
      <button
        type="button"
        disabled={ activity === '' }
        onClick={ handleAddTask }
      >
        Adicionar
      </button>
    </form>
  );
};

TaskForm.propTypes = {
  addTask: PropTypes.func.isRequired,
};

export default TaskForm;
