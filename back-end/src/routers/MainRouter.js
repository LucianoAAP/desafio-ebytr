const MainRoutes = require('express').Router({ mergeParams: true });

const TasksRouter = require('./TasksRouter');

MainRoutes.use('/tasks', TasksRouter);

module.exports = MainRoutes;
