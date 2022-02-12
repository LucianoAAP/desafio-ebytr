const TasksModel = require('../models/TasksModel');
const { notFound } = require('../error/apiError');

const findAll = async () => TasksModel.findAll();

const findById = async () => {
  const task = await TasksModel.findById(id);
  if (!task) return notFound('Task does not exist');
  return task;
};

const create = async (entries) => TasksModel.create(entries);

const update = async (id, entries) => {
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
