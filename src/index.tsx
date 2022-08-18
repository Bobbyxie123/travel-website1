import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'antd/dist/antd.css';
import './i18n/configs.ts'
import axios from 'axios';
import {Provider} from 'react-redux'
import rootStore from "./redux/store";
import { PersistGate } from 'redux-persist/lib/integration/react';
import { Spin } from "antd";
// axios.defaults.headers['x-icode'] =  '35BA1CCF08E2ABE6' ;


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={rootStore.store}>

    <PersistGate persistor ={rootStore.persistor} loading={<Spin />} >
      <App />
    </PersistGate>

  </Provider>
);

