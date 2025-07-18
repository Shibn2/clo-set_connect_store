import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from './redux/store';
import { increment } from './redux/userSlice';
import ProductListPage from './components/productListPage/productListPage';

const App = () => {
  // const count = useSelector((state: RootState) => state.user.value);
  // const dispatch = useDispatch();

  return (
    <div>
      <ProductListPage/>
    </div>
  );
};

export default App;
