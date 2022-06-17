import axios from 'axios';
import { CustomerRequest } from '../request-types';
import { Customer } from '../types';

export async function createCustomer(
  accessToken: string | null,
  customerRequest: CustomerRequest
): Promise<Customer> {
  const response = await axios.post<Customer>(
    'https://api-referralstack-io.azurewebsites.net/api/v1/customers',
    customerRequest,
    {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    }
  );

  return response.data;
}
