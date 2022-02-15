import React, { useState } from 'react';

const TaskForm = () => {
  const [activity, setActivity] = useState('');
  const [status, setStatus] = useState('Pendente');

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
          <option value="Concluído">Concluído</option>
        </select>
      </label>
      <button
        type="button"
        className="add-task-button"
        disabled={ activity === '' }
      >
        Adicionar
      </button>
    </form>
  );
};

export default TaskForm;
