const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const { ObjectId } = require('mongodb');
const server = require('../../api/app');
const mongoConnection = require('../../models/connection');
const { getConnection, stopConnection } = require('../mockConnection');

chai.use(chaiHttp);

const { expect } = chai;

describe('Testa remove', () => {
  const id = '620aa97466edc7d67e2865f3';
  const task = {
    _id: ObjectId(id),
    activity: 'Testar back-end',
    status: 'Pendente',
    dateCreated: '2022-02-15T00:26:48.144Z',
  };

  describe('Quando a tarefa não existe', () => {
    let response = {};

    before(async () => {
      const connectionMock = await getConnection().then((conn) => conn.db('Ebytr'));
      sinon.stub(mongoConnection, 'connect').resolves(connectionMock);

      response = await chai.request(server).delete(`/tasks/${id}`);
    });

    after(async () => {
      mongoConnection.connect.restore();
      await stopConnection();
    });

    it('Retorna a mensagem de erro correta', () => {
      expect(response).to.have.status(404);
      expect(response.body).to.be.equal('Task does not exist');
    });
  });

  describe('Quando a tarefa existe', () => {
    let response = {};
    let missingTask = {};

    before(async () => {
      const connectionMock = await getConnection().then((conn) => conn.db('Ebytr'));
      sinon.stub(mongoConnection, 'connect').resolves(connectionMock);

      await connectionMock.collection('tasks').insertOne(task);

      response = await chai.request(server).delete(`/tasks/${id}`);

      missingTask = await connectionMock.collection('tasks').findOne({ activity: task.activity });
    });

    after(async () => {
      mongoConnection.connect.restore();
      await stopConnection();
    });

    it('Deleta tarefa no banco', () => {
      expect(missingTask).to.be.null;
    });
  
    it('Retorna a resposta correta', () => {
      expect(response).to.have.status(204);
      expect(response.body).to.be.deep.equal({});
    });
  });
});
