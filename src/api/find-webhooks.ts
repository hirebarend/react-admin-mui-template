import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase';
import { Webhook } from '../types';

export async function findWebhooks(tenantId: string): Promise<Array<Webhook>> {
  const querySnapshot = await getDocs(
    query(collection(db, 'webhooks'), where('tenantId', '==', tenantId))
  );

  const documents: Array<Webhook> = querySnapshot.docs.map((x) => {
    return {
      ...(x.data() as Webhook),
      id: x.id,
    };
  });

  return documents;
}
