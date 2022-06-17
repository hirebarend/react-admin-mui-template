import axios from 'axios';
import { Referrer } from '../types';

export async function findReferrers(
  accessToken: string | null
): Promise<Array<Referrer>> {
  const response = await axios.get<Array<Referrer>>(
    'https://api-referralstack-io.azurewebsites.net/api/v1/referrers',
    {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    }
  );

  return response.data;
}
