/* eslint-disable no-undef */

export const APP = {
  meta: {
    description:
      'A referral program will be your best channel for acquiring new customers. Referral Stack is trusted by the world’s fastest growing SAAS enterprises.',
    title: 'Referral Stack - Get more out of every customer',
  },
  name: 'Referral Stack',
};

export const AUTH0_PROVIDER = {
  clientId: process.env.REACT_APP_AUTH0_CLIENT_ID,
  domain: process.env.REACT_APP_AUTH0_DOMAIN,
  redirectUri: window.location.origin,
};
