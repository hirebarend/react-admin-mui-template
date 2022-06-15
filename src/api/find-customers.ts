import { collection, getDocs, query, where } from 'firebase/firestore';
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
