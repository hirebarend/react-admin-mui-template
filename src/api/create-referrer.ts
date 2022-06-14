import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase';
import { Referrer } from '../types';

export async function createReferrer(
  tenantId: string,
  referrer: Referrer
): Promise<Referrer | null> {
  const documentReference = await addDoc(collection(db, 'referrers'), {
    ...referrer,
    tenantId,
  });

  referrer.id = documentReference.id;

  return referrer;
}
