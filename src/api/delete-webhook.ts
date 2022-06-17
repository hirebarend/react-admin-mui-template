import axios from 'axios';

export async function deleteWebhook(
  accessToken: string | null,
  id: string
): Promise<void> {
  await axios.delete(
    `https://api-referralstack-io.azurewebsites.net/api/v1/webhooks/${id}`,
    {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    }
  );
}
