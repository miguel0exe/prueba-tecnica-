import { render, screen } from '@testing-library/react';
import SearchForm from '../SearchForm';

describe('Componente: SearchForm', () => {
  const mockFormAction = jest.fn();

  it('1. Renderiza el input correctamente', () => {
    render(<SearchForm formAction={mockFormAction} isPending={false} />);
    
    const input = screen.getByPlaceholderText('Find your character...');
    expect(input).toBeInTheDocument();
    expect(input).not.toBeDisabled();
  });

  it('2. Deshabilita el input cuando isPending es true (estado de carga)', () => {
    render(<SearchForm formAction={mockFormAction} isPending={true} />);
    
    const input = screen.getByPlaceholderText('Find your character...');
    expect(input).toBeDisabled();
  });
});