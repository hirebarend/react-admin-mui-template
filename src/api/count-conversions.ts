import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase';
import { Conversion } from '../types';

export async function countConversionsByCampaignCode(
  tenantId: string,
  campaignCode: string
): Promise<number> {
  const querySnapshot = await getDocs(
    query(
      collection(db, 'conversions'),
      where('campaign.code', '==', campaignCode)
    )
  );

  const conversions: Array<Conversion> = querySnapshot.docs.map((x) => {
    return {
      ...(x.data() as Conversion),
      id: x.id,
    };
  });

  return conversions.length;
}
