import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';

export async function deleteWebhook(
  tenantId: string,
  id: string
): Promise<void> {
  await deleteDoc(doc(db, 'webhooks', id));
}
