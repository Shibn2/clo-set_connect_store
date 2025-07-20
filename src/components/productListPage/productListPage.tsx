import React, { useEffect, useRef, useState, useCallback } from 'react';
import Filter from '../filter/filter';
import ProductGrid from '../productGrid/productGrid';
import Search from '../search/search';
import './productListPage.scss';
import useQuery from '../../hooks/useQueryHook';
import { FilterState, PricingOption, product } from '../../types';
import { AppDispatch, RootState } from '../../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { setPricingOptions, setSearchTerm } from '../../redux/filterSlice';
import { filterProductList, setProductList, updateProductList } from '../../redux/productSlice';
import { CLOSET_LABEL, LOADING } from '../../constants';

const ProductListPage = () => {
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const loaderRef = useRef<HTMLDivElement | null>(null);
  const dispatch = useDispatch<AppDispatch>();

  const { getAll: getQueryParams, set: setQueryParam, clearAll: clearAllQueryParams } = useQuery();
  const filters = useSelector((state: RootState) => state.filters);
  const selectedPricingOptions = useSelector((state: RootState) => state.filters.pricingOptions);
  const searchTerm = useSelector((state: RootState) => state.filters.searchTerm);

  // Fetch products from remote
  const fetchProducts = useCallback(async () => {
    setLoading(true);
    const URL = 'https://closet-recruiting-api.azurewebsites.net/api/data';
    try {
      const result = await fetch(URL);
      const data: product[] = await result.json();
      const queryParams = getQueryParams();
      dispatch(setProductList(data));
      if (queryParams.search || queryParams.priceOption) {
        const payload: FilterState = {
          searchTerm: '',
          pricingOptions: [],
        };
        if (queryParams.search) {
          payload.searchTerm = queryParams.search;
          dispatch(setSearchTerm(queryParams.search));
        }
        if (queryParams.priceOption) {
          payload.pricingOptions = queryParams.priceOption.split(',').map((val) => Number(val));
          dispatch(setPricingOptions(payload.pricingOptions));
        }
        dispatch(filterProductList(payload));
      }
    } catch (err) {
      console.error('Error on product fetch', err);
    } finally {
      setLoading(false);
    }
  }, [dispatch]);

  // Intersection Observer: on intersect update the productList
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first.isIntersecting) {
          dispatch(updateProductList());
        }
      },
      { threshold: 1 },
    );

    const currentLoader = loaderRef.current;
    if (currentLoader) observer.observe(currentLoader);

    return () => {
      if (currentLoader) observer.unobserve(currentLoader);
    };
  }, [loaderRef]);

  // Initial load of product data from remote
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Searcch input change handler
  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value;
    setQueryParam({ search: searchTerm });
    dispatch(setSearchTerm(searchTerm));
    dispatch(filterProductList({ ...filters, searchTerm }));
  };

  // Filter input change handler
  const onChangeFilterHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value) as PricingOption;
    let updatedFilters;
    if (e.target.checked) {
      updatedFilters = [...selectedPricingOptions, value];
    } else {
      updatedFilters = selectedPricingOptions.filter((filter) => filter !== value);
    }
    setQueryParam({ priceOption: updatedFilters.join(',') });
    dispatch(setPricingOptions(updatedFilters));
    dispatch(filterProductList({ ...filters, pricingOptions: updatedFilters }));
  };

  // Handle reset click
  const resetClick = () => {
    setQueryParam({ priceOption: '', search: '' });
    window.location.reload();
  };

  return (
    <div className="product-list-page">
      <header className="product-list-header">
        <h3>{CLOSET_LABEL}</h3>
      </header>
      <main className="product-list-main">
        <Search
          onChangeHandler={onChangeHandler}
          onBlurHandler={() => {}}
          onFocusChange={() => {}}
          searchTerm={searchTerm}
        />
        <Filter
          selectedFilters={selectedPricingOptions}
          onChangeFilterHandler={onChangeFilterHandler}
          resetClick={resetClick}
        />
        <ProductGrid />
        <div ref={loaderRef} style={{ height: 1 }} />
        {loading && <p style={{ textAlign: 'center' }}>{LOADING}</p>}
      </main>
    </div>
  );
};

export default ProductListPage;
