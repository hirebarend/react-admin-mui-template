import { collection, getDocs, query, where } from 'firebase/firestore';
import { DATA } from '../data';
import { db } from '../firebase';
import { Customer } from '../types';

export async function findCustomers(
  tenantId: string
): Promise<Array<Customer>> {
  const querySnapshot = await getDocs(
    query(collection(db, 'customers'), where('tenantId', '==', tenantId))
  );

  const customers: Array<Customer> = querySnapshot.docs.map((x) => {
    return {
      ...(x.data() as Customer),
      id: x.id,
    };
  });

  return customers;
}

export async function findCustomersMock(
  // eslint-disable-next-line no-unused-vars
  tenantId: string
): Promise<Array<Customer>> {
  return DATA.results.map((x) => {
    return {
      emailAddress: x.email,
      firstName: x.name.first,
      id: Math.random().toString(36).substring(2, 9),
      lastName: x.name.last,
    };
  });
}
