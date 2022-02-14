const express = require('express');
const errorMiddleware = require('../middlewares/error');
const mainRoutes = require('../routers/MainRouter');


const app = express();
app.use(express.json());

app.use(mainRoutes);

app.use(errorMiddleware);

module.exports = app;
