import React, { useState, useEffect } from 'react';
import { getTasks } from '../services/tasksApi';

const MINUS_ONE = -1;

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [sortedTasks, setSortedTasks] = useState([]);
  const [sorting, setSorting] = useState('activity');

  useEffect(() => {
    getTasks().then((result) => {
      setTasks(result);
      setSortedTasks(result);
    });
  }, []);

  const handleSorting = (sortingCriterium) => {
    setSorting(sortingCriterium);
    const newTasks = tasks.sort((a, b) => {
      const first = a[sortingCriterium].toLowerCase();
      const second = b[sortingCriterium].toLowerCase();
      if (first < second) return MINUS_ONE;
      if (first > second) return 1;
      return 0;
    });
    setSortedTasks(newTasks);
  };

  const getDate = (dateTime) => new Date(dateTime).toLocaleDateString('pt-BR');

  return (
    <div className="list-container">
      <div className="sorting-field">
        <label htmlFor="sorter">
          Ordenar por:
          <select
            name="sorter"
            value={ sorting }
            onChange={ ({ target: { value } }) => handleSorting(value) }
          >
            <option value="activity">Ordem alfabética</option>
            <option value="status">Status</option>
            <option value="dateCreated">Data de criação</option>
          </select>
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
            sortedTasks.map((task) => (
              <tr key={ task.id }>
                <td>{ task.activity }</td>
                <td>{ task.status }</td>
                <td>{ getDate(task.dateCreated) }</td>
                <td>
                  <button type="button">Editar</button>
                  <button type="button">Remover</button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
};

export default TaskList;
