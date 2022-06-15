import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase';
import { Campaign } from '../types';

export async function findCampaignsByReferrerId(
  tenantId: string,
  referrerId: string
): Promise<Array<Campaign>> {
  const querySnapshot = await getDocs(
    query(
      collection(db, 'campaigns'),
      where('tenantId', '==', tenantId),
      where('referrerId', '==', referrerId)
    )
  );

  const campaigns: Array<Campaign> = querySnapshot.docs.map((x) => {
    return {
      ...(x.data() as Campaign),
      id: x.id,
    };
  });

  return campaigns;
}
