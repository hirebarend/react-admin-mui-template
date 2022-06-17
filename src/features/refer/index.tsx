import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

export function Refer() {
  const params = useParams();

  useEffect(() => {
    if (!params.campaignCode) {
      return;
    }

    localStorage.setItem('campaignCode', params.campaignCode);
  }, [params.campaignCode]);

  return <></>;
}
