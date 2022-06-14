import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase';
import { Campaign } from '../types';

export async function createCampaign(
  referrerId: string,
  campaign: Campaign
): Promise<Campaign | null> {
  const documentReference = await addDoc(collection(db, 'campaigns'), {
    ...campaign,
    referrerId,
  });

  campaign.id = documentReference.id;

  return campaign;
}
