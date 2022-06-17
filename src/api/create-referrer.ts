import axios from 'axios';
import { ReferrerRequest } from '../request-types';
import { Referrer } from '../types';

export async function createReferrer(
  accessToken: string | null,
  referrerRequest: ReferrerRequest
): Promise<Referrer> {
  const response = await axios.post<Referrer>(
    'https://api-referralstack-io.azurewebsites.net/api/v1/referrers',
    referrerRequest,
    {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    }
  );

  return response.data;
}
