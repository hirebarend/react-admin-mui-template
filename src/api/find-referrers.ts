import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase';
import { Referrer } from '../types';

export async function findReferrers(
  tenantId: string
): Promise<Array<Referrer>> {
  const querySnapshot = await getDocs(
    query(collection(db, 'referrers'), where('tenantId', '==', tenantId))
  );

  const referrers: Array<Referrer> = querySnapshot.docs.map((x) => {
    return {
      ...(x.data() as Referrer),
    };
  });

  return referrers;
}
