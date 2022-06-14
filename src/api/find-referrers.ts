import { collection, getDocs, query, where } from 'firebase/firestore';
import { DATA } from '../data';
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
      id: x.id,
    };
  });

  return referrers;
}

export async function findReferrersMock(
  // eslint-disable-next-line no-unused-vars
  tenantId: string
): Promise<Array<Referrer>> {
  return DATA.results.map((x) => {
    return {
      createdAt: new Date().toISOString(),
      id: x.email,
    };
  });
}
