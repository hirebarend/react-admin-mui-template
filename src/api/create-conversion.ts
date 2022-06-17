import axios from 'axios';
import { ConversionRequest } from '../request-types';
import { Conversion } from '../types';

export async function createConversion(
  accessToken: string | null,
  code: string,
  conversionRequest: ConversionRequest
): Promise<Conversion> {
  const response = await axios.post<Conversion>(
    `https://api-referralstack-io.azurewebsites.net/api/v1/campaigns/${code}/conversions`,
    conversionRequest,
    {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    }
  );

  return response.data;
}
