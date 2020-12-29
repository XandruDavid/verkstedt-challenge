import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('app renders with header', () => {
  render(<App />);
  const headerElement = screen.getByText('GitHub populare repos explorer');
  expect(headerElement).toBeInTheDocument();
});
