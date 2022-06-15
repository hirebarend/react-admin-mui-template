import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase';
import { Referrer } from '../types';

export async function findReferrer(
  tenantId: string,
  id: string
): Promise<Referrer | null> {
  const querySnapshot = await getDocs(
    query(
      collection(db, 'referrers'),
      where('tenantId', '==', tenantId),
      where('id', '==', id)
    )
  );

  const referrers: Array<Referrer> = querySnapshot.docs.map((x) => {
    return {
      ...(x.data() as Referrer),
    };
  });

  if (!referrers.length) {
    return null;
  }

  return referrers[0];
}
