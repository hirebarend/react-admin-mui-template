import axios from 'axios';
import { Campaign } from '../types';

export async function findCampaignByCode(
  accessToken: string | null,
  code: string
): Promise<Campaign | null> {
  try {
    const response = await axios.get<Campaign>(
      `https://api-referralstack-io.azurewebsites.net/api/v1/campaigns/${code}`,
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
