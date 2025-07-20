import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Filter from './filter';
import { PricingOption } from '../../types';

describe('Filter component', () => {
  const setup = (selectedFilters: PricingOption[] = []) => {
    const onChangeFilterHandler = jest.fn();
    render(
      <Filter selectedFilters={selectedFilters} onChangeFilterHandler={onChangeFilterHandler} />,
    );
    return { onChangeFilterHandler };
  };

  it('renders all pricing options as checkboxes', () => {
    setup();

    expect(screen.getByLabelText('Paid')).toBeInTheDocument();
    expect(screen.getByLabelText('Free')).toBeInTheDocument();
    expect(screen.getByLabelText('View only')).toBeInTheDocument();
  });

  it('marks selected filters as checked', () => {
    setup([PricingOption.FREE, PricingOption.VIEW_ONLY]);

    expect(screen.getByLabelText('Free')).toBeChecked();
    expect(screen.getByLabelText('View only')).toBeChecked();
    expect(screen.getByLabelText('Paid')).not.toBeChecked();
  });

  it('calls onChangeFilterHandler when a checkbox is toggled', () => {
    const { onChangeFilterHandler } = setup();

    const paidCheckbox = screen.getByLabelText('Paid');
    fireEvent.click(paidCheckbox);

    expect(onChangeFilterHandler).toHaveBeenCalledTimes(1);
    expect(onChangeFilterHandler.mock.calls[0][0].target.value).toBe(String(PricingOption.PAID));
  });
});
