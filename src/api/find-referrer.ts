import axios from 'axios';
import { Referrer } from '../types';

export async function findReferrer(
  accessToken: string | null,
  id: string
): Promise<Referrer | null> {
  try {
    const response = await axios.get<Referrer>(
      `https://api-referralstack-io.azurewebsites.net/api/v1/referrers/${id}`,
      {
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return response.data;
  } catch {
    return null;
  }
}
