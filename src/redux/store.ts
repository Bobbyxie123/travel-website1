import storage from "redux-persist/lib/storage";
import { persistStore,persistReducer } from "redux-persist";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { languageSlice } from "./language/slice";
import {actionlog} from './middlewares/actionLog';
import {changeLanguage} from './middlewares/changeLanguage'
import { recommendProductSlice } from "./recommendProducts/slice";
import { productDetailSlice } from "./productDetail/slice";
import {productSearchSlice} from '../redux/productSearch/slice'
import { userSlice } from "./user/slice";
import { shoppingCartSlice } from "./shoppingCart/slice";
import { orderSlice } from "./order/slice";

// RTK的slice的name一定不要写错，需要与action的第一个参数一致

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user", "shoppingCart"],
};

const rootReducer = combineReducers({
  language: languageSlice.reducer,
  recommendProduct: recommendProductSlice.reducer,
  productDetail: productDetailSlice.reducer,
  productSearch: productSearchSlice.reducer,
  user: userSlice.reducer,
  shoppingCart: shoppingCartSlice.reducer,
  order: orderSlice.reducer,
})

const persistedReducer = persistReducer(persistConfig,rootReducer)


const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(changeLanguage),
  devTools: true,
});



    // there are some problems here, applymiddleware cannot be used
    // how do we use multiple middleware in this way 

const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>;
// 通过使用ReturnType可以提取某函数的函数类型
export type AppDispatch = typeof store.dispatch;


export default {store,persistor};