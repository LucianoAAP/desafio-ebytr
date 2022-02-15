const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const server = require('../../api/app');
const mongoConnection = require('../../models/connection');
const { getConnection, stopConnection } = require('../mockConnection');

chai.use(chaiHttp);

const { expect } = chai;

describe('Testa findAll', () => {
  const id = '620aa97466edc7d67e2865f3';
  const task = {
    _id: id,
    activity: 'Testar back-end',
    status: 'Pendente',
    dateCreated: '2022-02-15T00:26:48.144Z',
  };
  const formatedTask = {
    id: id,
    activity: 'Testar back-end',
    status: 'Pendente',
    dateCreated: '2022-02-15T00:26:48.144Z',
  };
  let response = [];

  before(async () => {
    const connectionMock = await getConnection().then((conn) => conn.db('Ebytr'));
    sinon.stub(mongoConnection, 'connect').resolves(connectionMock);

    await connectionMock.collection('tasks').insertOne(task);

    response = await chai.request(server).get('/tasks');
  });

  after(async () => {
    mongoConnection.connect.restore();
    await stopConnection();
  });

  it('Retorna uma lista de tarefas', () => {
    expect(response).to.have.status(200);
    expect(response.body).to.be.deep.equal([formatedTask]);
  });
});
