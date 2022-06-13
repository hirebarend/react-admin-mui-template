import React from 'react';
import { Auth0Provider } from '@auth0/auth0-react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import './index.scss';
import App from './App';
import { AUTH0_PROVIDER } from './configuration';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

root.render(
  <React.StrictMode>
    <Auth0Provider
      clientId={AUTH0_PROVIDER.clientId || ''}
      domain={AUTH0_PROVIDER.domain || ''}
      redirectUri={AUTH0_PROVIDER.redirectUri || ''}
    >
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </BrowserRouter>
    </Auth0Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
