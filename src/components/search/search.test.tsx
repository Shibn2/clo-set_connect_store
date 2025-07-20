import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Search from './search';

describe('Search component', () => {
  const setup = (searchTerm = '') => {
    const onChangeHandler = jest.fn();
    const onBlurHandler = jest.fn();
    const onFocusChange = jest.fn();

    render(
      <Search
        onChangeHandler={onChangeHandler}
        onBlurHandler={onBlurHandler}
        onFocusChange={onFocusChange}
        searchTerm={searchTerm}
      />,
    );

    return { onChangeHandler, onBlurHandler, onFocusChange };
  };

  it('renders the search input with placeholder', () => {
    setup();
    const input = screen.getByPlaceholderText('Find the items you are looking for');
    expect(input).toBeInTheDocument();
  });

  it('renders the search input with passed value', () => {
    setup('Shoes');
    const input = screen.getByDisplayValue('Shoes');
    expect(input).toBeInTheDocument();
  });

  it('calls onChangeHandler when input changes', () => {
    const { onChangeHandler } = setup();
    const input = screen.getByPlaceholderText('Find the items you are looking for');

    fireEvent.change(input, { target: { value: 'Hat' } });
    expect(onChangeHandler).toHaveBeenCalledTimes(1);
  });

  it('calls onFocusChange when input is focused', () => {
    const { onFocusChange } = setup();
    const input = screen.getByPlaceholderText('Find the items you are looking for');

    fireEvent.focus(input);
    expect(onFocusChange).toHaveBeenCalled();
  });

  it('calls onBlurHandler when input loses focus', () => {
    const { onBlurHandler } = setup();
    const input = screen.getByPlaceholderText('Find the items you are looking for');

    fireEvent.blur(input);
    expect(onBlurHandler).toHaveBeenCalled();
  });
});
