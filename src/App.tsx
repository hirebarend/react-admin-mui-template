import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Routes, Route } from 'react-router-dom';
import {
  AppRoute,
  Customers,
  CustomersView,
  Home,
  Refer,
  Referrers,
  SignOut,
  Webhooks,
  WebhooksCreate,
} from './features';

// https://coolors.co/6210cc

export const THEME = createTheme({
  palette: {
    primary: {
      main: '#6210cc',
    },
    secondary: {
      main: '#10cb61',
    },
  },
  typography: {
    fontFamily: ['Inter'].join(','),
  },
} as any);

function App() {
  return (
    <ThemeProvider theme={THEME}>
      <Routes>
        <Route element={<>Hello World</>} path="/"></Route>
        <Route element={<Refer></Refer>} path="/refer/:campaignCode"></Route>
        <Route element={<AppRoute></AppRoute>} path="/app">
          <Route element={<Home></Home>} path=""></Route>
          <Route element={<Customers></Customers>} path="customers"></Route>
          <Route
            element={<CustomersView></CustomersView>}
            path="customers/:id"
          ></Route>
          <Route element={<Referrers></Referrers>} path="referrers"></Route>
          <Route element={<SignOut></SignOut>} path="sign-out"></Route>
          <Route element={<Webhooks></Webhooks>} path="webhooks"></Route>
          <Route
            element={<WebhooksCreate></WebhooksCreate>}
            path="webhooks/create"
          ></Route>
        </Route>
      </Routes>
    </ThemeProvider>
  );
}

export default App;
