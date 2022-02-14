import React from 'react';

const TaskForm = () => (
  <form>
    <label htmlFor="activity-input" className="config-label">
      Number of questions:
      <input
        name="activity-input"
        type="text"
      />
    </label>
  </form>
);

export default TaskForm;
