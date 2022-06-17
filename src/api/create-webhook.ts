import axios from 'axios';
import { WebhookRequest } from '../request-types';
import { Webhook } from '../types';

export async function createWebhook(
  accessToken: string | null,
  webhookRequest: WebhookRequest
): Promise<Webhook> {
  const response = await axios.post<Webhook>(
    'https://api-referralstack-io.azurewebsites.net/api/v1/webhooks',
    webhookRequest,
    {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    }
  );

  return response.data;
}
