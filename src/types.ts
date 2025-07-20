export enum PricingOption {
  PAID = 0,
  FREE = 1,
  VIEW_ONLY = 2,
}

export type product = {
  id: string;
  creator: string;
  title: string;
  pricingOption: PricingOption;
  imagePath: string;
  price: number;
};

export type FilterState = {
  pricingOptions: PricingOption[]; // checkbox array
  searchTerm: string;
};

export type ProductListState = {
  ogProductList: product[];
  filteredProductList: product[];
  productList: product[];
  page: number;
};
