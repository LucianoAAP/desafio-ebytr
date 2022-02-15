import React, { useState } from 'react';

const TaskForm = () => {
  const [activity, setActivity] = useState('');
  const [status, setStatus] = useState('Pendente');

  return (
    <form>
      <label htmlFor="activity-input">
        Tarefa:
        <input
          name="activity-input"
          type="text"
          value={ activity }
          onChange={ ({ target: { value } }) => setActivity(value) }
        />
      </label>
      <label htmlFor="status">
        Status:
        <select
          name="status"
          value={ status }
          onChange={ ({ target: { value } }) => setStatus(value) }
        >
          <option value="Pendente">Pendente</option>
          <option value="Concluído">Concluído</option>
        </select>
      </label>
      <button type="button" disabled={ activity === '' }>Adicionar</button>
    </form>
  );
};

export default TaskForm;
