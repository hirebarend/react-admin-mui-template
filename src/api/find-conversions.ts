import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase';
import { Conversion } from '../types';

export async function findConversions(
  entity: string
): Promise<Array<Conversion>> {
  const querySnapshot = await getDocs(
    query(collection(db, 'conversions'), where('entity', '==', entity))
  );

  const conversions: Array<Conversion> = querySnapshot.docs.map((x) => {
    return {
      ...(x.data() as Conversion),
      id: x.id,
    };
  });

  return conversions;
}

export async function findConversionsMock(
  entity: string
): Promise<Array<Conversion>> {
  return [
    {
      campaign: {
        code: '8563',
        id: 'de66f180-1ca8-4c8b-bad8-ba147fa2cb74',
        name: 'Campaign 1',
        referrer: {
          createdAt: new Date().toISOString(),
          id: 'foo.bar@example.com',
        },
      },
      createdAt: new Date().toISOString(),
      entity,
      type: 'sign_up',
    },
  ];
}
