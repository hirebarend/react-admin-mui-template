import axios from 'axios';
import { Conversion } from '../types';

export async function refer(
  accessToken: string | null,
  body: {
    campaignCode: string;
    firstName: string;
    lastName: string;
    emailAddress: string;
    type: string;
  }
): Promise<Conversion> {
  const response = await axios.post<Conversion>(
    'https://api-referralstack-io.azurewebsites.net/api/v1/refer',
    body,
    {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    }
  );

  return response.data;
}
