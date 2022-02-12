const { OK, CREATED, NO_CONTENT } = require('http-status-codes');
const TasksService = require('../services/TaskService');

const findAll = async (_req, res) => {
  const tasks = await TasksService.findAll();
  return res.status(OK).json(tasks);
};

const findById = async (req, res) => {
  const task = await TasksService.findById(req.params.id);
  return res.status(OK).json(task);
};

const create = async (req, res) => {
  const task = TasksService.create(req.body);
  return res.status(CREATED).json(task);
};

const update = async (req, res) => {
  const task = TasksService.update(req.params.id, req.body);
  return res.status(OK).json(task);
};

const remove = async (req, res) => {
  await TasksService.remove(req.params.id);
  return res.status(NO_CONTENT).end();
};

module.exports = { findAll, findById, create, update, remove };
