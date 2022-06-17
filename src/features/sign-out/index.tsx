import React, { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

export function SignOut() {
  const { logout } = useAuth0();

  useEffect(() => {
    logout({
      returnTo: 'https://referralstack.io',
    });
  }, []);

  return <></>;
}
