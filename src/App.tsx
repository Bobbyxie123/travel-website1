import React, { useEffect } from 'react';
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import styles from './App.module.css'
import HomePage from './pages/home/HomePage'
import SignInPage from './pages/signin/SignInPage'
import RegisterPage from './pages/register/RegisterPage'
import {DetailPage} from './pages/detail/DetailPage'
import {SearchPage} from './pages/search/SearchPage'
import { ShoppingCartPage } from './pages/shoppingCart/ShoppingCart';
import { Navigate } from "react-router-dom";
import { useSelector,useAppDispatch } from "./redux/hooks";
import { getShoppingCart } from "./redux/shoppingCart/slice";
import { PlaceOrderPage } from './pages/placeOrder/PlaceOrder';

const PrivateRoute = ({children}) => { 
  const jwt = useSelector (s => s.user.token)
  return jwt ? children: <Navigate to = '/signin'/>
}
//the use of private routes 

function App() {
  const jwt = useSelector(s=>s.user.token);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (jwt) {
      dispatch(getShoppingCart(jwt));
    }
  }, [dispatch, jwt]);
  return (
    <div className={styles.App}>
      <BrowserRouter>
        <Routes>
          <Route path = '/' element={<HomePage/>}/>
          <Route path = '/signin' element={<SignInPage/>}/>
          <Route path = '/register' element={<RegisterPage/>}/>
          <Route path = '/detail/:touristRouteId' element={<DetailPage/>}/>
          <Route path='/search' element={<SearchPage />}>
              <Route path=':keywords' element={<SearchPage />}></Route>
          </Route>
          <Route 
            path = '/shoppingCart' 
            element={
              <PrivateRoute>
                <ShoppingCartPage/>
              </PrivateRoute>}
          />
          <Route 
          path='placeOrder'
          element = {
            <PrivateRoute>
              <PlaceOrderPage/>
            </PrivateRoute>
          }
          />
          <Route path="*" element={<h1>404 not found, page does not exist</h1>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

