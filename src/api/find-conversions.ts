import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from 'firebase/firestore';
import { db } from '../firebase';
import { Conversion } from '../types';

export async function findConversionsByCampaignCode(
  tenantId: string,
  campaignCode: string
): Promise<Array<Conversion>> {
  const querySnapshot = await getDocs(
    query(
      collection(db, 'conversions'),
      where('tenantId', '==', tenantId),
      where('campaign.code', '==', campaignCode),
      orderBy('createdAtUnix', 'desc'),
      limit(5)
    )
  );

  const conversions: Array<Conversion> = querySnapshot.docs.map((x) => {
    return {
      ...(x.data() as Conversion),
      id: x.id,
    };
  });

  return conversions;
}

export async function findConversionsByEntity(
  tenantId: string,
  entity: string
): Promise<Array<Conversion>> {
  const querySnapshot = await getDocs(
    query(
      collection(db, 'conversions'),
      where('tenantId', '==', tenantId),
      where('entity', '==', entity),
      orderBy('createdAtUnix', 'desc')
    )
  );

  const conversions: Array<Conversion> = querySnapshot.docs.map((x) => {
    return {
      ...(x.data() as Conversion),
      id: x.id,
    };
  });

  return conversions;
}
