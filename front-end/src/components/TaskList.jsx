import React from 'react';
import PropTypes from 'prop-types';

const { arrayOf, shape, string, func } = PropTypes;

const TaskList = (
  { tasks, sorting, ordering, handleSorting, handleRemoveTask, toggleEditing },
) => {
  const getDate = (dateTime) => new Date(dateTime).toLocaleDateString('pt-BR');

  return (
    <div className="list-container">
      <div className="sorting-field">
        <label htmlFor="sorter">
          Ordenar por:
          <select
            id="sorter"
            className="sorting-select"
            value={ sorting }
            onChange={ ({ target: { value } }) => handleSorting(value, ordering) }
          >
            <option value="activity">Ordem alfabética</option>
            <option value="status">Status</option>
            <option value="dateCreated">Data de criação</option>
          </select>
        </label>
        <label htmlFor="asc">
          Asc:
          <input
            id="asc"
            name="ordering"
            type="radio"
            value="asc"
            defaultChecked
            onClick={ ({ target: { value } }) => handleSorting(sorting, value) }
          />
        </label>
        <label htmlFor="desc">
          Desc:
          <input
            id="desc"
            name="ordering"
            type="radio"
            value="desc"
            onClick={ ({ target: { value } }) => handleSorting(sorting, value) }
          />
        </label>
      </div>
      <table className="task-table">
        <thead>
          <tr>
            <th>Tarefa</th>
            <th>Status</th>
            <th>Data de criação</th>
            <th>Editar / Remover</th>
          </tr>
        </thead>
        <tbody>
          {
            tasks.map((task) => (
              <tr key={ task.id }>
                <td>{ task.activity }</td>
                <td>{ task.status }</td>
                <td>{ getDate(task.dateCreated) }</td>
                <td>
                  <button
                    type="button"
                    onClick={ () => toggleEditing(task) }
                  >
                    Editar
                  </button>
                  <button
                    type="button"
                    onClick={ () => handleRemoveTask(task.id) }
                  >
                    Remover
                  </button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
};

TaskList.propTypes = {
  tasks: arrayOf(shape({
    id: string.isRequired,
    activity: string.isRequired,
    status: string.isRequired,
    dateCreated: string.isRequired,
  })).isRequired,
  sorting: string.isRequired,
  ordering: string.isRequired,
  handleSorting: func.isRequired,
  toggleEditing: func.isRequired,
  handleRemoveTask: func.isRequired,
};

export default TaskList;
