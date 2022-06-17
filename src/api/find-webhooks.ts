import axios from 'axios';
import { Webhook } from '../types';

export async function findWebhooks(
  accessToken: string | null
): Promise<Array<Webhook>> {
  const response = await axios.get<Array<Webhook>>(
    'https://api-referralstack-io.azurewebsites.net/api/v1/webhooks',
    {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    }
  );

  return response.data;
}
