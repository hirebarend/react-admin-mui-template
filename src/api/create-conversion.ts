import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase';
import { Conversion } from '../types';

export async function createConversion(
  tenantId: string,
  conversion: Conversion
): Promise<Conversion> {
  const documentReference = await addDoc(collection(db, 'conversions'), {
    ...conversion,
    tenantId,
  });

  conversion.id = documentReference.id;

  return conversion;
}
