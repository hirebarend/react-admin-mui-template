import { collection, getDocs, query } from 'firebase/firestore';
import { db } from '../firebase';
import { Webhook } from '../types';

export async function findWebhooks(): Promise<Array<Webhook>> {
  const querySnapshot = await getDocs(query(collection(db, 'webhooks')));

  const documents: Array<Webhook> = querySnapshot.docs.map((x) => {
    return {
      ...(x.data() as Webhook),
      id: x.id,
    };
  });

  return documents;
}

export async function findWebhooksMock(): Promise<Array<Webhook>> {
  return [
    {
      id: '486405b4-65b0-470d-b141-1cf031a187bb',
      name: 'httpbin',
      status: 'active',
      url: 'https://httpbin.org/post',
    },
  ];
}
