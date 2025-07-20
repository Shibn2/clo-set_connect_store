import { PRICING_OPTION_LABEL, RESET_LABEL } from '../../constants';
import { PricingOption } from '../../types';
import './filter.scss';

type filterPropTypes = {
  selectedFilters: PricingOption[];
  onChangeFilterHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  resetClick: () => void;
};

const pricingLabels: Record<PricingOption, string> = {
  [PricingOption.PAID]: 'Paid',
  [PricingOption.FREE]: 'Free',
  [PricingOption.VIEW_ONLY]: 'View only',
};

const Filter: React.FC<filterPropTypes> = ({
  onChangeFilterHandler,
  selectedFilters,
  resetClick,
}) => {
  return (
    <div className="filter">
      <div className="filter-form">
        <span className="body-text">{PRICING_OPTION_LABEL}</span>

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
      <button onClick={resetClick} className="filter-button body-text">
        {RESET_LABEL}
      </button>
    </div>
  );
};

export default Filter;
