import { FREE_LABEL, NA, VIEW_ONLY_LABEL } from '../../constants';
import { PricingOption, product } from '../../types';
import './productCard.scss';

const getPricingOption = (pricingOption: number, price: number) => {
  switch (pricingOption) {
    case PricingOption.PAID:
      return `$${price}`;
    case PricingOption.FREE:
      return FREE_LABEL;
    case PricingOption.VIEW_ONLY:
      return VIEW_ONLY_LABEL;
    default:
      return NA;
  }
};

const ProductCard: React.FC<product> = ({
  id,
  creator,
  title,
  pricingOption,
  imagePath,
  price,
}) => {
  return (
    <div className="product-card">
      <div className="product-image">
        <img src={imagePath} alt={title} />
      </div>
      <div className="product-description">
        <div className="product-title body-text">
          <div>
            <label>{title}</label>
          </div>
          <div>
            <label>{creator}</label>
          </div>
        </div>
        <div className="product-price">
          <span>{getPricingOption(pricingOption, price)}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
