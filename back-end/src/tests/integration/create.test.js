const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const server = require('../../api/app');
const mongoConnection = require('../../models/connection');
const { getConnection, stopConnection } = require('../mockConnection');

chai.use(chaiHttp);

const { expect } = chai;

describe('Testa create', () => {
  const task = {
    activity: 'Testar back-end',
    status: 'Pendente',
  };

  describe('Quando não há atividade no corpo da requisição', () => {
    let response = {};
    let createdTask = {};

    before(async () => {
      const connectionMock = await getConnection().then((conn) => conn.db('Ebytr'));
      sinon.stub(mongoConnection, 'connect').resolves(connectionMock);

      response = await chai.request(server).post('/tasks').send({ status: task.status });

      createdTask = await connectionMock.collection('tasks').findOne({ status: task.status });
    });

    after(async () => {
      mongoConnection.connect.restore();
      await stopConnection();
    });

    it('Não cria tarefa no banco', async () => {
      expect(createdTask).to.be.null;
    });
  
    it('Retorna a mensagem de erro correta', () => {
      expect(response).to.have.status(400);
      expect(response.body).to.be.equal('"activity" is required');
    });
  });

  describe('Quando a atividade está vazia', () => {
    let response = {};
    let createdTask = {};

    before(async () => {
      const connectionMock = await getConnection().then((conn) => conn.db('Ebytr'));
      sinon.stub(mongoConnection, 'connect').resolves(connectionMock);

      response = await chai.request(server).post('/tasks')
        .send({ activity: '', status: task.status });

      createdTask = await connectionMock.collection('tasks').findOne({ status: task.status });
    });

    after(async () => {
      mongoConnection.connect.restore();
      await stopConnection();
    });

    it('Não cria tarefa no banco', async () => {
      expect(createdTask).to.be.null;
    });
  
    it('Retorna a mensagem de erro correta', () => {
      expect(response).to.have.status(400);
      expect(response.body).to.be.equal('"activity" is not allowed to be empty');
    });
  });

  describe('Quando não há status da tarefa no corpo da requisição', () => {
    let response = {};
    let createdTask = {};

    before(async () => {
      const connectionMock = await getConnection().then((conn) => conn.db('Ebytr'));
      sinon.stub(mongoConnection, 'connect').resolves(connectionMock);

      response = await chai.request(server).post('/tasks')
        .send({ activity: task.activity });

      createdTask = await connectionMock.collection('tasks')
        .findOne({ activity: task.activity });
    });

    after(async () => {
      mongoConnection.connect.restore();
      await stopConnection();
    });

    it('Não cria tarefa no banco', async () => {
      expect(createdTask).to.be.null;
    });
  
    it('Retorna a mensagem de erro correta', () => {
      expect(response).to.have.status(400);
      expect(response.body).to.be.equal('"status" is required');
    });
  });

  describe('Quando o status da tarefa está vazio', () => {
    let response = {};
    let createdTask = {};

    before(async () => {
      const connectionMock = await getConnection().then((conn) => conn.db('Ebytr'));
      sinon.stub(mongoConnection, 'connect').resolves(connectionMock);

      response = await chai.request(server).post('/tasks')
        .send({ activity: task.activity, status: '' });

      createdTask = await connectionMock.collection('tasks')
        .findOne({ activity: task.activity });
    });

    after(async () => {
      mongoConnection.connect.restore();
      await stopConnection();
    });

    it('Não cria tarefa no banco', async () => {
      expect(createdTask).to.be.null;
    });
  
    it('Retorna a mensagem de erro correta', () => {
      expect(response).to.have.status(400);
      expect(response.body).to.be.equal('"status" is not allowed to be empty');
    });
  });

  describe('Quando a tarefa é criada com sucesso', () => {
    let response = {};
    let createdTask = {};

    before(async () => {
      const connectionMock = await getConnection().then((conn) => conn.db('Ebytr'));
      sinon.stub(mongoConnection, 'connect').resolves(connectionMock);

      response = await chai.request(server).post('/tasks').send(task);

      createdTask = await connectionMock.collection('tasks')
        .findOne({ activity: task.activity });
    });

    after(async () => {
      mongoConnection.connect.restore();
      await stopConnection();
    });

    it('Cria tarefa no banco', async () => {
      expect(createdTask).to.be.not.null;
    });
  
    it('Retorna a resposta correta', () => {
      expect(response).to.have.status(201);
      expect(response.body).to.be.an('object');
      expect(response.body).to.have.property('activity');
      expect(response.body.activity).to.be.equal(task.activity);
      expect(response.body).to.have.property('status');
      expect(response.body.status).to.be.equal(task.status);
    });
  });
});
