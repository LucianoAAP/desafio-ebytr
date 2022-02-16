import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import axios from 'axios';
import { tasks } from './mocks';

jest.mock('socket.io-client', () => jest.fn(() => ({
  emit: jest.fn(),
  on: jest.fn(),
})));

describe('Testa página de tarefas', () => {
  describe('Testa renderização dos componentes iniciais', () => {
    beforeEach(() => {
      const axiosGetMock = jest.spyOn(axios, 'get');
      axiosGetMock.mockResolvedValue({ data: tasks });
    });

    it('Renderiza os componentes', async () => {
      renderWithRouter(<App />);
      expect(axios.get).toHaveBeenCalled();
      const title = screen.getByText('Tarefas da Ebytr');
      expect(title).toBeInTheDocument();
      const newTaskInput = screen.getByLabelText('Nova tarefa:');
      expect(newTaskInput).toBeInTheDocument();
      const statusSelect = screen.getByLabelText('Status:');
      expect(statusSelect).toBeInTheDocument();
      const addButton = screen.getByText('Adicionar');
      expect(addButton).toBeInTheDocument();
      const sortingSelect = screen.getByLabelText('Ordenar por:');
      expect(sortingSelect).toBeInTheDocument();
      const ascRadio = screen.getByLabelText('Asc');
      expect(ascRadio).toBeInTheDocument();
      const descRadio = screen.getByLabelText('Desc');
      expect(descRadio).toBeInTheDocument();
      const taskHead = screen.getByText('Tarefa');
      expect(taskHead).toBeInTheDocument();
      const statusHead = screen.getByRole('row', { name: /Status/ });
      expect(statusHead).toBeInTheDocument();
      const dateHead = screen.getByRole('row', { name: /Data de criação/ });
      expect(dateHead).toBeInTheDocument();
      const buttonsHead = screen.getByText('Editar / Remover');
      expect(buttonsHead).toBeInTheDocument();
      const firstActivity = await screen.findByText('Fazer deploy');
      expect(firstActivity).toBeInTheDocument();
      const secondActivity = screen.getByText('Testar front-end');
      expect(secondActivity).toBeInTheDocument();
      const thirdActivity = screen.getByText('Testar back-end');
      expect(thirdActivity).toBeInTheDocument();
      const firstStatus = screen.getByRole('row', { name: /Pendente/ });
      expect(firstStatus).toBeInTheDocument();
      const secondStatus = screen.getByRole('row', { name: /Em andamento/ });
      expect(secondStatus).toBeInTheDocument();
      const thirdStatus = screen.getByRole('row', { name: /Pronto/ });
      expect(thirdStatus).toBeInTheDocument();
      const firstDate = screen.getByText('15/02/2022');
      expect(firstDate).toBeInTheDocument();
      const secondDate = screen.getByText('16/02/2022');
      expect(secondDate).toBeInTheDocument();
      const thirdDate = screen.getByText('15/03/2022');
      expect(thirdDate).toBeInTheDocument();
      const editButtons = screen.getAllByRole('button', { name: /Editar/ });
      expect(editButtons).toHaveLength(3);
      const removeButtons = screen.getAllByRole('button', { name: /Remover/ });
      expect(removeButtons).toHaveLength(3);
    });
  });

  describe('Testa o formulário de edição', () => {
    beforeEach(() => {
      const axiosGetMock = jest.spyOn(axios, 'get');
      axiosGetMock.mockResolvedValue({ data: tasks });
    });

    it('Renderiza o formulário', async () => {
      renderWithRouter(<App />);
      const editButtons = await screen.findAllByRole('button', { name: /Editar/ });
      userEvent.click(editButtons[1]);
      const editTaskInput = screen.getByLabelText('Editar tarefa:');
      expect(editTaskInput).toBeInTheDocument();
      const statusSelect = screen.getByLabelText('Status:');
      expect(statusSelect).toBeInTheDocument();
      const updateButton = screen.getByText('Atualizar');
      expect(updateButton).toBeInTheDocument();
      const cancelButton = screen.getByText('Cancelar');
      expect(cancelButton).toBeInTheDocument();
    });

    it('Os inputs ficam com as informações da tarefa', async () => {
      renderWithRouter(<App />);
      const editButtons = await screen.findAllByRole('button', { name: /Editar/ });
      userEvent.click(editButtons[1]);
      const editTaskInput = screen.getByLabelText('Editar tarefa:');
      expect(editTaskInput.value).toBe('Testar back-end');
    });

    it('Desrenderiza o formulário ao cancelar edição', async () => {
      renderWithRouter(<App />);
      const editButtons = await screen.findAllByRole('button', { name: /Editar/ });
      userEvent.click(editButtons[1]);
      const cancelButton = screen.getByText('Cancelar');
      expect(cancelButton).toBeInTheDocument();
      userEvent.click(cancelButton);
      expect(cancelButton).not.toBeInTheDocument();
    });
  });

  describe('Testa criação de tarefas', () => {
    beforeEach(() => {
      const axiosGetMock = jest.spyOn(axios, 'get');
      const axiosPostMock = jest.spyOn(axios, 'post');
      axiosGetMock.mockResolvedValue({ data: tasks });
      axiosPostMock.mockResolvedValue({ data: {} });
    });

    it('Botão faz chamada à API', () => {
      renderWithRouter(<App />);
      const newTaskInput = screen.getByLabelText('Nova tarefa:');
      const statusSelect = screen.getByLabelText('Status:');
      const addButton = screen.getByText('Adicionar');
      userEvent.type(newTaskInput, 'Criar tarefa');
      userEvent.selectOptions(statusSelect, 'Em andamento');
      userEvent.click(addButton);
      expect(axios.post).toHaveBeenCalled();
    });
  });

  describe('Testa edição de tarefas', () => {
    beforeEach(() => {
      const axiosGetMock = jest.spyOn(axios, 'get');
      const axiosPutMock = jest.spyOn(axios, 'put');
      axiosGetMock.mockResolvedValue({ data: tasks });
      axiosPutMock.mockResolvedValue({ data: {} });
    });

    it('Botão faz chamada à API', async () => {
      renderWithRouter(<App />);
      const editButtons = await screen.findAllByRole('button', { name: /Editar/ });
      userEvent.click(editButtons[0]);
      const editTaskInput = screen.getByLabelText('Editar tarefa:');
      const statusSelect = screen.getByLabelText('Status:');
      const updateButton = screen.getByText('Atualizar');
      userEvent.type(editTaskInput, 'atualizando');
      userEvent.selectOptions(statusSelect, 'Em andamento');
      userEvent.click(updateButton);
      expect(axios.put).toHaveBeenCalled();
    });
  });

  describe('Testa remoção de tarefas', () => {
    beforeEach(() => {
      const axiosGetMock = jest.spyOn(axios, 'get');
      const axiosDeleteMock = jest.spyOn(axios, 'delete');
      axiosGetMock.mockResolvedValue({ data: tasks });
      axiosDeleteMock.mockResolvedValue({ data: {} });
    });

    it('Botão faz chamada à API', async () => {
      renderWithRouter(<App />);
      const removeButtons = await screen.findAllByRole('button', { name: /Remover/ });
      userEvent.click(removeButtons[0]);
      expect(axios.delete).toHaveBeenCalled();
    });
  });

  describe('Testa ordenação das tarefas', () => {
    beforeEach(() => {
      const axiosGetMock = jest.spyOn(axios, 'get');
      axiosGetMock.mockResolvedValue({ data: tasks });
    });

    it('Select ordena de acordo com a categoria', async () => {
      renderWithRouter(<App />);
      const firstActivity = await screen.findByText('Fazer deploy');
      expect(firstActivity).toBeInTheDocument();
      const sortingSelect = screen.getByLabelText('Ordenar por:');
      userEvent.selectOptions(sortingSelect, 'Status');
      const firstTask = screen.getByTestId('activity-0');
      expect(firstTask.innerHTML).toBe('Testar front-end');
      const secondTask = screen.getByTestId('activity-1');
      expect(secondTask.innerHTML).toBe('Fazer deploy');
      const thirdTask = screen.getByTestId('activity-2');
      expect(thirdTask.innerHTML).toBe('Testar back-end');
    });

    it('Botões radio invertem a ordenação', async () => {
      renderWithRouter(<App />);
      const firstActivity = await screen.findByText('Fazer deploy');
      expect(firstActivity).toBeInTheDocument();
      const sortingSelect = screen.getByLabelText('Ordenar por:');
      const ascRadio = screen.getByLabelText('Asc');
      const descRadio = screen.getByLabelText('Desc');
      userEvent.selectOptions(sortingSelect, 'Status');
      userEvent.click(descRadio);
      const firstTask = screen.getByTestId('activity-0');
      expect(firstTask.innerHTML).toBe('Testar back-end');
      const secondTask = screen.getByTestId('activity-1');
      expect(secondTask.innerHTML).toBe('Fazer deploy');
      const thirdTask = screen.getByTestId('activity-2');
      expect(thirdTask.innerHTML).toBe('Testar front-end');
      userEvent.click(ascRadio);
      const newFirstTask = screen.getByTestId('activity-0');
      expect(newFirstTask.innerHTML).toBe('Testar front-end');
      const newSecondTask = screen.getByTestId('activity-1');
      expect(newSecondTask.innerHTML).toBe('Fazer deploy');
      const newThirdTask = screen.getByTestId('activity-2');
      expect(newThirdTask.innerHTML).toBe('Testar back-end');
    });
  });
});
