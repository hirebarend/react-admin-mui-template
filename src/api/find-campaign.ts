import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase';
import { Campaign } from '../types';

export async function findCampaign(
  tenantId: string,
  code: string
): Promise<Campaign | null> {
  const querySnapshot = await getDocs(
    query(collection(db, 'campaigns'), where('code', '==', code))
  );

  const campaigns: Array<Campaign> = querySnapshot.docs.map((x) => {
    return {
      ...(x.data() as Campaign),
      id: x.id,
    };
  });

  if (!campaigns.length) {
    return null;
  }

  return campaigns[0];
}
