import { PricingOption, product } from '../../types';
import './productCard.scss';

const getPricingOption = (pricingOption: number, price: number) => {
  switch (pricingOption) {
    case PricingOption.PAID:
      return `$${price}`;
    case PricingOption.FREE:
      return 'Free';
    case PricingOption.VIEW_ONLY:
      return 'View only';
    default:
      return 'N/A';
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

// {
//     "id": "content-001",
//     "creator": "Adam",
//     "title": "Yellow green coat",
//     "pricingOption": 0,
//     "imagePath": "https://closetfrontrecruiting.blob.core.windows.net/images/thumbnail_1.jpeg",
//     "price": 50
//   },
