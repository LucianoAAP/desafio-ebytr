const { ObjectId } = require('mongodb');
const connection = require('./connection');

const findAll = async () => (connection.connect()
  .then((db) => db.collection('tasks').find().toArray()));

const findById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const task = await connection.connect()
    .then((db) => db.collection('tasks').findOne(ObjectId(id)));
  if (!task) return null;
  return { _id: id, ...task };
};

const create = async ({ activity, status, dateCreated = new Date() }) => (
  connection.connect()
  .then((db) => db.collection('tasks').insertOne({ activity, status, dateCreated }))
  .then((result) => ({ activity, status, dateCreated, _id: result.insertedId })));

const update = async (id, entries) => {
  await connection.connect().then((db) => db.collection('tasks').updateOne(
    { _id: ObjectId(id) },
    { $set: { ...entries } },
  ));
  return findById(id);
};

const remove = async (id) => {
  const task = await findById(id);
  await connection.connect()
    .then((db) => db.collection('tasks').deleteOne({ _id: ObjectId(id) }));
};

module.exports = { findAll, findById, create, update, remove };
