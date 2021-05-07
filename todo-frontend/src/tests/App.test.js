import React from 'react';
import { render } from '@testing-library/react';
import App from '../App';
import TodoPage from '../pages/TodoPage';



describe('Testanto arquivo APP.js', () => {
  test('Todo List é renderizado no caminho URL /', async() => {
    const { getByText } = render(<App />);
    // await new Promise(r => setTimeout(r, 2000)); 
    const heading = getByText(/Todo List/i);
    expect(heading).toBeInTheDocument();
  });

  test('aplicação contem os filtros To do, Done e Deleted', async() => {
    const { getByText } = render(<TodoPage />);
    // await new Promise(r => setTimeout(r, 2000));
    const todo = getByText(/to do/i);
    expect(todo).toBeInTheDocument();
    const done = getByText(/done/i);
    expect(done).toBeInTheDocument();
    const deleted = getByText(/deleted/i);
    expect(deleted).toBeInTheDocument();
  });

  test('aplicação contem um imput e um botão de submit para adicionar tarefas', () => {
    const { getByTestId } = render(<TodoPage />);
    expect(getByTestId('todo-imput')).toBeInTheDocument()
    expect(getByTestId('todo-submit')).toBeInTheDocument()
  });

})
