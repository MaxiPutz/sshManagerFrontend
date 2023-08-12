import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import "./index.css"
import { Provider } from 'react-redux';
import { store } from "./store/store"
import {router} from "./Router" 
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

const rootEle = document.getElementById('root')

const root = ReactDOM.createRoot(rootEle as Element);



root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App></App>
    </Provider>
  </React.StrictMode>
);

