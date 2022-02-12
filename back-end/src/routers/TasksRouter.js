const rescue = require('express-rescue');
const TasksRouter = require('express').Router({ mergeParams: true });
const {
  findAll,
  findById,
  create,
  update,
  remove
} = require('../controllers/TasksController');

TasksRouter.get('/', rescue(findAll));
TasksRouter.get('/:id', rescue(findById));
TasksRouter.post('/', rescue(create));
TasksRouter.put('/:id', rescue(update));
TasksRouter.delete('/:id', rescue(remove));

module.exports = TasksRouter;
