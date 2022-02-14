const joi = require('joi');

const schema = joi.object().keys({
  task: joi.string().empty(false).required().max(300),
  status: joi.string().empty(false).required().max(50),
});

module.exports = (task) => {
  const { error } = schema.validate(task);

  if (error) {
    return error.details[0].message;
  }
  
  return false;
};
