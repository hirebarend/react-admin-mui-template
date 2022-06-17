import axios from 'axios';
import { CampaignRequest } from '../request-types';
import { Campaign } from '../types';

export async function createCampaign(
  accessToken: string | null,
  referrerId: string,
  campaignRequest: CampaignRequest
): Promise<Campaign> {
  const response = await axios.post<Campaign>(
    `https://api-referralstack-io.azurewebsites.net/api/v1/referrers/${referrerId}/campaigns`,
    campaignRequest,
    {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    }
  );

  return response.data;
}
