const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const { ObjectId } = require('mongodb');
const server = require('../../api/app');
const mongoConnection = require('../../models/connection');
const { getConnection, stopConnection } = require('../mockConnection');

chai.use(chaiHttp);

const { expect } = chai;

describe('Testa update', () => {
  const id = '620aa97466edc7d67e2865f3';
  const task = {
    _id: ObjectId(id),
    activity: 'Testar back-end',
    status: 'Pendente',
  };

  const updatedTask = {
    _id: ObjectId(id),
    activity: 'Testar front-end',
    status: 'Completa',
  };

  describe('Quando não há atividade no corpo da requisição', () => {
    let response = {};
    let taskData = {};

    before(async () => {
      const connectionMock = await getConnection().then((conn) => conn.db('Ebytr'));
      sinon.stub(mongoConnection, 'connect').resolves(connectionMock);

      await connectionMock.collection('tasks').insertOne(task);

      response = await chai.request(server).put(`/tasks/${id}`)
        .send({ status: updatedTask.status });

      taskData = await connectionMock.collection('tasks')
        .findOne({ status: updatedTask.status });
    });

    after(async () => {
      mongoConnection.connect.restore();
      await stopConnection();
    });

    it('Não atualiza tarefa no banco', async () => {
      expect(taskData).to.be.null;
    });
  
    it('Retorna a mensagem de erro correta', () => {
      expect(response).to.have.status(400);
      expect(response.body).to.be.equal('"activity" is required');
    });
  });

  describe('Quando a atividade está vazia', () => {
    let response = {};
    let taskData = {};

    before(async () => {
      const connectionMock = await getConnection().then((conn) => conn.db('Ebytr'));
      sinon.stub(mongoConnection, 'connect').resolves(connectionMock);

      await connectionMock.collection('tasks').insertOne(task);

      response = await chai.request(server).put(`/tasks/${id}`)
        .send({ activity: '', status: updatedTask.status });

      taskData = await connectionMock.collection('tasks')
        .findOne({ status: updatedTask.status });
    });

    after(async () => {
      mongoConnection.connect.restore();
      await stopConnection();
    });

    it('Não atualiza tarefa no banco', async () => {
      expect(taskData).to.be.null;
    });
  
    it('Retorna a mensagem de erro correta', () => {
      expect(response).to.have.status(400);
      expect(response.body).to.be.equal('"activity" is not allowed to be empty');
    });
  });

  describe('Quando não há status da tarefa no corpo da requisição', () => {
    let response = {};
    let taskData = {};

    before(async () => {
      const connectionMock = await getConnection().then((conn) => conn.db('Ebytr'));
      sinon.stub(mongoConnection, 'connect').resolves(connectionMock);

      await connectionMock.collection('tasks').insertOne(task);

      response = await chai.request(server).put(`/tasks/${id}`)
        .send({ activity: updatedTask.activity });

      taskData = await connectionMock.collection('tasks')
        .findOne({ activity: updatedTask.activity });
    });

    after(async () => {
      mongoConnection.connect.restore();
      await stopConnection();
    });

    it('Não atualiza tarefa no banco', async () => {
      expect(taskData).to.be.null;
    });
  
    it('Retorna a mensagem de erro correta', () => {
      expect(response).to.have.status(400);
      expect(response.body).to.be.equal('"status" is required');
    });
  });

  describe('Quando o status da tarefa está vazio', () => {
    let response = {};
    let taskData = {};

    before(async () => {
      const connectionMock = await getConnection().then((conn) => conn.db('Ebytr'));
      sinon.stub(mongoConnection, 'connect').resolves(connectionMock);

      await connectionMock.collection('tasks').insertOne(task);

      response = await chai.request(server).put(`/tasks/${id}`)
        .send({ activity: updatedTask.activity, status: '' });

      taskData = await connectionMock.collection('tasks')
        .findOne({ activity: updatedTask.activity });
    });

    after(async () => {
      mongoConnection.connect.restore();
      await stopConnection();
    });

    it('Não atualiza tarefa no banco', async () => {
      expect(taskData).to.be.null;
    });
  
    it('Retorna a mensagem de erro correta', () => {
      expect(response).to.have.status(400);
      expect(response.body).to.be.equal('"status" is not allowed to be empty');
    });
  });

  describe('Quando a tarefa é atualizada com sucesso', () => {
    let response = {};
    let taskData = {};

    before(async () => {
      const connectionMock = await getConnection().then((conn) => conn.db('Ebytr'));
      sinon.stub(mongoConnection, 'connect').resolves(connectionMock);

      await connectionMock.collection('tasks').insertOne(task);

      response = await chai.request(server).put(`/tasks/${id}`)
        .send({ activity: updatedTask.activity, status: updatedTask.status });

      taskData = await connectionMock.collection('tasks')
        .findOne({ activity: updatedTask.activity });
    });

    after(async () => {
      mongoConnection.connect.restore();
      await stopConnection();
    });

    it('Atualiza tarefa no banco', async () => {
      expect(taskData).to.be.not.null;
    });
  
    it('Retorna a tarefa correta', () => {
      expect(response).to.have.status(200);
      expect(response.body).to.be.deep.equal({ ...updatedTask, _id: id });
    });
  });
});
