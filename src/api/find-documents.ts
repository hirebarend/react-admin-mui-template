import { collection, getDocs, query } from 'firebase/firestore';
import { db } from '../firebase';
import { Document } from '../types';

export async function findDocuments(): Promise<Array<Document>> {
  const querySnapshot = await getDocs(query(collection(db, 'documents')));

  const documents: Array<Document> = querySnapshot.docs.map((x) => {
    return {
      ...(x.data() as Document),
      id: x.id,
    };
  });

  return documents;
}
