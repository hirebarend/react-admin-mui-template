/* eslint-disable no-undef */

export const AUTH0_PROVIDER = {
  clientId: process.env.REACT_APP_AUTH0_CLIENT_ID,
  domain: process.env.REACT_APP_AUTH0_DOMAIN,
  redirectUri: window.location.origin,
};
