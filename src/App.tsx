import React, { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Routes, Route } from 'react-router-dom';
import {
  AppRoute,
  Customers,
  CustomersView,
  Home,
  Referrers,
  Webhooks,
  WebhooksCreate,
} from './features';
import { getApiClient } from './api-client';

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
  const { user } = useAuth0();

  useEffect(() => {
    (async () => {
      if (user && user.email && user.family_name && user.given_name) {
        const tenantId: string = 'f8bda464edc9b041ad311e5806c24475';

        const apiClient = await getApiClient(tenantId);

        const campaignCode: string = 'TWDJ1';

        await apiClient.createConversion(
          campaignCode,
          user.given_name,
          user.family_name,
          user.email,
          'sign_up'
        );
      }
    })();
  }, [user]);

  return (
    <ThemeProvider theme={THEME}>
      <Routes>
        <Route element={<>Hello World</>} path="/"></Route>
        <Route element={<AppRoute></AppRoute>} path="/app">
          <Route element={<Home></Home>} path=""></Route>
          <Route element={<Customers></Customers>} path="customers"></Route>
          <Route
            element={<CustomersView></CustomersView>}
            path="customers/:id"
          ></Route>
          <Route element={<Referrers></Referrers>} path="referrers"></Route>
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
