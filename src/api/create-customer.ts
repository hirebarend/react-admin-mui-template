import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase';
import {  Customer } from '../types';

export async function createCustomer(
  tenantId: string,
  customer: Customer
): Promise<Customer> {
  const documentReference = await addDoc(collection(db, 'customers'), {
    ...customer,
    tenantId
  });

  customer.id = documentReference.id;

  return customer;
}
