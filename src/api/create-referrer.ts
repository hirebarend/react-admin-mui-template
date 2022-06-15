import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase';
import { Referrer } from '../types';

export async function createReferrer(
  tenantId: string,
  referrer: Referrer
): Promise<Referrer> {
  await addDoc(collection(db, 'referrers'), {
    ...referrer,
    tenantId,
  });

  return referrer;
}
