import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase';
import { Conversion } from '../types';

export async function findConversions(
  tenantId: string,
  entity: string
): Promise<Array<Conversion>> {
  const querySnapshot = await getDocs(
    query(collection(db, 'conversions'), where('entity', '==', entity))
  );

  const conversions: Array<Conversion> = querySnapshot.docs.map((x) => {
    return {
      ...(x.data() as Conversion),
      id: x.id,
    };
  });

  return conversions;
}
