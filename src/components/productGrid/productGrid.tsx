import { useSelector } from 'react-redux';
import { product } from '../../types';
import ProductCard from '../productCard/productCard';
import './productGrid.scss';
import { RootState } from '../../redux/store';

const ProductGrid = () => {
  const productList = useSelector((state: RootState) => state.productList.productList);
  return (
    <div className="product-grid">
      {productList.map(({ id, creator, title, pricingOption, imagePath, price }, idx) => {
        return (
          <ProductCard
            key={id}
            id={id}
            creator={creator}
            title={title}
            pricingOption={pricingOption}
            imagePath={imagePath}
            price={price}
          />
        );
      })}
    </div>
  );
};

export default ProductGrid;
