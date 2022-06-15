import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from 'firebase/firestore';
import { db } from '../firebase';
import { Customer } from '../types';

export async function findCustomer(
  tenantId: string,
  id: string
): Promise<Customer | null> {
  const documentSnapshot = await getDoc(doc(db, 'customers', id));

  if (!documentSnapshot.exists()) {
    return null;
  }

  return {
    ...(documentSnapshot.data() as Customer),
    id: documentSnapshot.id,
  };
}

export async function findCustomerByEmailAddress(
  tenantId: string,
  emailAddress: string
): Promise<Customer | null> {
  const querySnapshot = await getDocs(
    query(
      collection(db, 'customers'),
      where('tenantId', '==', tenantId),
      where('emailAddress', '==', emailAddress)
    )
  );

  const customers: Array<Customer> = querySnapshot.docs.map((x) => {
    return {
      ...(x.data() as Customer),
      id: x.id,
    };
  });

  if (!customers.length) {
    return null;
  }

  return customers[0];
}
