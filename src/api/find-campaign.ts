import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase';
import { Campaign } from '../types';

export async function findCampaignByCode(
  tenantId: string,
  code: string
): Promise<Campaign | null> {
  const querySnapshot = await getDocs(
    query(
      collection(db, 'campaigns'),
      where('tenantId', '==', tenantId),
      where('code', '==', code)
    )
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

export async function findTenantIdByCampaignCode(
  code: string
): Promise<string | null> {
  const querySnapshot = await getDocs(
    query(collection(db, 'campaigns'), where('code', '==', code))
  );

  if (querySnapshot.empty) {
    return null;
  }

  return querySnapshot.docs[0].data().tenantId;
}
