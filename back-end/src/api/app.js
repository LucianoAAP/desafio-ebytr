const express = require('express');
const cors = require('cors');
const errorMiddleware = require('../middlewares/error');
const mainRoutes = require('../routers/MainRouter');


const app = express();
app.use(cors());
app.use(express.json());

app.use(mainRoutes);

app.use(errorMiddleware);

module.exports = app;
