import axios from 'axios';
import { Conversion } from '../types';

export async function findConversionsByEntity(
  accessToken: string | null,
  entity: string
): Promise<Array<Conversion>> {
  const response = await axios.get<Array<Conversion>>(
    'https://api-referralstack-io.azurewebsites.net/api/v1/conversions',
    {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
      params: {
        entity,
      },
    }
  );

  return response.data;
}
