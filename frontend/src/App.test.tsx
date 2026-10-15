import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App.jsx';

describe('App component', () => {
  it('renders without crashing', () => {
    const { container } = render(
      <App />
    );
    const h1 = container.querySelector('h1');
    expect(h1).toBeInTheDocument();
  });
});