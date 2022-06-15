import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase';
import { Conversion } from '../types';

export async function createConversion(
  tenantId: string,
  conversion: Conversion
): Promise<Conversion> {
  await addDoc(collection(db, 'conversions'), {
    ...conversion,
    tenantId,
  });

  return conversion;
}
