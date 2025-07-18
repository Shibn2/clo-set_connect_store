import React, { useState } from "react";
import Filter from "../filter/filter";
import ProductGrid from "../productGrid/productGrid";
import Search from "../search/search";
import './productListPage.scss';

const ProductListPage = () => {

  const [productList, setProductList] = useState({});

  const onChangeHandler = () => {}
  const onBlurHandler = () => {}
  const onFocusChange = () => {}


    return <div className="product-list-page">
    <header><h3>Closet</h3></header>
      <main>
        <Search onChangeHandler={onChangeHandler}
          onBlurHandler={onBlurHandler}
          onFocusChange={onFocusChange}
        />
        <Filter/>
        <ProductGrid/>
      </main>
    </div>
}

export default ProductListPage;