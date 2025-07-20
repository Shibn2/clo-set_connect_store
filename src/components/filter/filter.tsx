import { PricingOption } from '../../types';
import './filter.scss';

type filterPropTypes = {
  selectedFilters: PricingOption[];
  onChangeFilterHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const pricingLabels: Record<PricingOption, string> = {
  [PricingOption.PAID]: 'Paid',
  [PricingOption.FREE]: 'Free',
  [PricingOption.VIEW_ONLY]: 'View only',
};

const Filter: React.FC<filterPropTypes> = ({ onChangeFilterHandler, selectedFilters }) => {
  return (
    <div className="filter">
      <div className="filter-form">
        <span className="body-text">Pricing options</span>
        {/* <span>
          <input onChange={onChangeFilterHandler} value={'paid'} name="paid" type="checkbox" /> Paid
        </span>
        <span>
          <input onChange={onChangeFilterHandler} value={'free'} name="free" type="checkbox" /> Free
        </span>
        <span>
          <input
            onChange={onChangeFilterHandler}
            value={'view only'}
            name="view only"
            type="checkbox"
          />{' '}
          View Only
        </span> */}
        {Object.values(PricingOption)
          .filter((value) => typeof value === 'number')
          .map((value) => (
            <label className="body-text">
              <input
                className="checkbox"
                type="checkbox"
                value={value}
                name={pricingLabels[value as PricingOption]}
                checked={selectedFilters.includes(value as PricingOption)}
                onChange={onChangeFilterHandler}
              />
              {pricingLabels[value as PricingOption]}
            </label>
          ))}
      </div>
      <button className="filter-button body-text">RESET</button>
    </div>
  );
};

export default Filter;
