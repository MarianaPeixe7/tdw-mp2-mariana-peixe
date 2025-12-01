import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../store/store';
import PoemCard from '../components/PoemCard';

const samplePoem = {
  title: 'Sonnet 18',
  author: 'Shakespeare',
  lines: ['Shall I compare thee to a summer’s day?', 'Thou art more lovely and more temperate.']
};

test('PoemCard renders correctly', () => {
  render(
    <Provider store={store}>
      <PoemCard poem={samplePoem} />
    </Provider>
  );

  expect(screen.getByText(/Sonnet 18/i)).toBeInTheDocument();
  expect(screen.getByText(/Shakespeare/i)).toBeInTheDocument();
  expect(screen.getByText(/Shall I compare thee/i)).toBeInTheDocument();
  expect(screen.getByText(/Ver poema/i)).toBeInTheDocument();
});

test('PoemCard toggle favorito', () => {
  render(
    <Provider store={store}>
      <PoemCard poem={samplePoem} />
    </Provider>
  );

  const button = screen.getByText(/Favorito/i);
  fireEvent.click(button);
  expect(button.textContent).toBe('Remover');
});
