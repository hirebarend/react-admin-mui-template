import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export function Refer() {
  const navigate = useNavigate();

  const params = useParams();

  useEffect(() => {
    if (!params.campaignCode) {
      return;
    }

    localStorage.setItem('campaignCode', params.campaignCode);

    navigate('/app');
  }, [params.campaignCode]);

  return <></>;
}
