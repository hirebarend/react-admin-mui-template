import axios from 'axios';
import { Customer } from '../types';

export async function findCustomer(
  accessToken: string | null,
  id: string
): Promise<Customer | null> {
  try {
    const response = await axios.get<Customer>(
      `https://api-referralstack-io.azurewebsites.net/api/v1/customers/${id}`,
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

export async function findCustomerByEmailAddress(
  accessToken: string | null,
  emailAddress: string
): Promise<Customer | null> {
  const response = await axios.get<Array<Customer>>(
    'https://api-referralstack-io.azurewebsites.net/api/v1/customers',
    {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
      params: {
        emailAddress,
      },
    }
  );

  if (!response.data.length) {
    return null;
  }

  return response.data[0];
}
