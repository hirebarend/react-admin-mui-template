import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import { db } from '../firebase';
import { Conversion } from '../types';

export async function findConversionsByEntity(
  tenantId: string,
  entity: string
): Promise<Array<Conversion>> {
  const querySnapshot = await getDocs(
    query(
      collection(db, 'conversions'),
      where('tenantId', '==', tenantId),
      where('entity', '==', entity),
      orderBy('createdAtUnix', 'desc')
    )
  );

  const conversions: Array<Conversion> = querySnapshot.docs.map((x) => {
    return {
      ...(x.data() as Conversion),
    };
  });

  return conversions;
}
