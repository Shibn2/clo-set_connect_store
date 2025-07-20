import React from 'react';
import { render, screen } from '@testing-library/react';
import ProductGrid from './productGrid';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import productReducer from '../../redux/productSlice';
import { RootState } from '../../redux/store';
import { PricingOption } from '../../types';

// Setup a test store with mocked initial state
const renderWithStore = (productList: RootState['productList']['productList']) => {
  const store = configureStore({
    reducer: {
      productList: productReducer,
    },
    preloadedState: {
      productList: {
        productList,
        // Add other keys if your slice has them
      },
    } as RootState,
  });

  return render(
    <Provider store={store}>
      <ProductGrid />
    </Provider>,
  );
};

describe('ProductGrid', () => {
  const mockProducts = [
    {
      id: 'p1',
      creator: 'Alice',
      title: 'Blue Jacket',
      pricingOption: PricingOption.PAID,
      imagePath: 'https://example.com/image1.jpg',
      price: 40,
    },
    {
      id: 'p2',
      creator: 'Bob',
      title: 'Red Shirt',
      pricingOption: PricingOption.FREE,
      imagePath: 'https://example.com/image2.jpg',
      price: 0,
    },
  ];

  it('renders a list of product cards from the store', () => {
    renderWithStore(mockProducts);

    expect(screen.getByText('Blue Jacket')).toBeInTheDocument();
    expect(screen.getByText('Alice')).toBeInTheDocument();
    expect(screen.getByText('$40')).toBeInTheDocument();

    expect(screen.getByText('Red Shirt')).toBeInTheDocument();
    expect(screen.getByText('Bob')).toBeInTheDocument();
    expect(screen.getByText('Free')).toBeInTheDocument();
  });

  it('renders no products if product list is empty', () => {
    renderWithStore([]);
    expect(screen.queryByText('Blue Jacket')).not.toBeInTheDocument();
  });
});
