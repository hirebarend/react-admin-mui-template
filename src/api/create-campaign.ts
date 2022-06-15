import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase';
import { Campaign } from '../types';

export async function createCampaign(
  tenantId: string,
  campaign: Campaign
): Promise<Campaign> {
  const documentReference = await addDoc(collection(db, 'campaigns'), {
    ...campaign,
    tenantId,
  });

  campaign.id = documentReference.id;

  return campaign;
}
