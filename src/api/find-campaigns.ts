import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase';
import { Campaign } from '../types';

export async function findCampaigns(
  referrerId: string
): Promise<Array<Campaign>> {
  const querySnapshot = await getDocs(
    query(collection(db, 'campaigns'), where('referrerId', '==', referrerId))
  );

  const campaigns: Array<Campaign> = querySnapshot.docs.map((x) => {
    return {
      ...(x.data() as Campaign),
      id: x.id,
    };
  });

  return campaigns;
}
