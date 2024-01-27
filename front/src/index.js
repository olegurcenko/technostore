import { AdminDataProvider, UserDataProvider } from './context/authDataContext';
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { App } from './App.js';
import React from 'react';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <BrowserRouter>
      <Provider store={store}>
        <AdminDataProvider>
          <UserDataProvider>
            <App/>
          </UserDataProvider>
        </AdminDataProvider>
      </Provider>
    </BrowserRouter>
  </>
);
