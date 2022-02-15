const TasksModel = require('../models/TasksModel');
const { notFound, badRequest } = require('../error/apiError');
const validateTask = require('../validations/ValidateTask');

const formatTask = ({ _id, ...task }) => ({ id: _id, ...task });

const findAll = async () => {
  const tasks = await TasksModel.findAll();
  const formatedTasks = tasks.map(formatTask);
  return formatedTasks;
};

const findById = async (id) => {
  const task = await TasksModel.findById(id);
  if (!task) return notFound('Task does not exist');
  const formatedTask = formatTask(task);
  return formatedTask;
};

const create = async (entries) => {
  const error = validateTask(entries);
  if (error) return badRequest(error);
  return await TasksModel.create(entries);
};

const update = async (id, entries) => {
  const error = validateTask(entries);
  if (error) return badRequest(error);
  const task = await TasksModel.findById(id);
  if (!task) return notFound('Task does not exist');
  return TasksModel.update(id, entries);
};

const remove = async (id) => {
  const task = await TasksModel.findById(id);
  if (!task) return notFound('Task does not exist');
  TasksModel.remove(id);
};

module.exports = { findAll, findById, create, update, remove };
