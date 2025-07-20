import React from 'react';
import { render, screen } from '@testing-library/react';
import ProductCard from './productCard';
import { PricingOption } from '../../types';

describe('ProductCard', () => {
  const baseProduct = {
    id: 'content-001',
    creator: 'Adam',
    title: 'Yellow green coat',
    imagePath: 'https://closetfrontrecruiting.blob.core.windows.net/images/thumbnail_1.jpeg',
    price: 50,
  };

  it('renders a paid product with correct price', () => {
    render(<ProductCard {...baseProduct} pricingOption={PricingOption.PAID} />);

    expect(screen.getByText('$50')).toBeInTheDocument();
    expect(screen.getByText('Yellow green coat')).toBeInTheDocument();
    expect(screen.getByText('Adam')).toBeInTheDocument();
    expect(screen.getByAltText('Yellow green coat')).toHaveAttribute('src', baseProduct.imagePath);
  });

  it('renders a free product', () => {
    render(<ProductCard {...baseProduct} pricingOption={PricingOption.FREE} />);

    expect(screen.getByText('Free')).toBeInTheDocument();
  });

  it('renders a view-only product', () => {
    render(<ProductCard {...baseProduct} pricingOption={PricingOption.VIEW_ONLY} />);

    expect(screen.getByText('View only')).toBeInTheDocument();
  });

  it('renders N/A for unknown pricing option', () => {
    render(
      <ProductCard
        {...baseProduct}
        // @ts-expect-error intentionally passing invalid value for test
        pricingOption={999}
      />,
    );

    expect(screen.getByText('N/A')).toBeInTheDocument();
  });
});
