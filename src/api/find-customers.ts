import axios from 'axios';
import { Customer } from '../types';

export async function findCustomers(
  accessToken: string | null
): Promise<Array<Customer>> {
  const response = await axios.get<Array<Customer>>(
    'https://api-referralstack-io.azurewebsites.net/api/v1/customers',
    {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    }
  );

  return response.data;
}
