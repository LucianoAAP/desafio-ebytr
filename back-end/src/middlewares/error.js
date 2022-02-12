const { INTERNAL_SERVER_ERROR } = require('http-status-codes');
const ApiError = require('../error/apiError');

module.exports = (err, _req, res, _next) => {
  console.log({ erro: err });

  if (err instanceof ApiError) {
    return res.status(err.status).json(err.message);
  }

  return res.status(INTERNAL_SERVER_ERROR).json({ message: 'Internal error!' });
};