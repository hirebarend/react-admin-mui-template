import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase';
import { Webhook } from '../types';

export async function createWebhook(
  tenantId: string,
  webhook: Webhook
): Promise<Webhook | null> {
  const documentReference = await addDoc(collection(db, 'webhooks'), {
    ...webhook,
    tenantId,
  });

  webhook.id = documentReference.id;

  return webhook;
}
