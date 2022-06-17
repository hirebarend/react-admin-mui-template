import axios from 'axios';
import { collection, deleteDoc, getDocs, query } from 'firebase/firestore';
import { db } from '../firebase';
import { Campaign, Customer, Referrer } from '../types';
import { createCampaign } from './create-campaign';
import { createConversion } from './create-conversion';
import { createCustomer } from './create-customer';
import { createReferrer } from './create-referrer';
import { findCampaignByCode } from './find-campaign';
import { findCustomerByEmailAddress } from './find-customer';
import { findReferrer } from './find-referrer';

export async function createTestData() {
  const tenantId: string = 'f8bda464edc9b041ad311e5806c24475';

  let referrer: Referrer | null = await findReferrer(tenantId, 'c3bdcad669c0');

  if (!referrer) {
    referrer = await createReferrer(tenantId, {
      createdAt: new Date().toISOString(),
      id: 'c3bdcad669c0',
    });
  }

  let campaign: Campaign | null = await findCampaignByCode(tenantId, 'TWDJ1');

  if (!campaign) {
    campaign = await createCampaign(tenantId, {
      code: 'TWDJ1',
      id: '',
      name: 'Campaign 1',
      referrer,
      type: ''
    });
  }

  const response = await axios.get(
    'https://randomuser.me/api?nat=gb&results=1'
  );

  for (const x of response.data.results) {
    let customer: Customer | null = await findCustomerByEmailAddress(
      tenantId,
      x.email
    );

    if (!customer) {
      customer = await createCustomer(tenantId, {
        emailAddress: x.email,
        firstName: x.name.first,
        id: '',
        lastName: x.name.last,
      });

      await createConversion(tenantId, {
        campaign,
        createdAt: new Date().toISOString(),
        createdAtUnix: new Date().getTime() / 1000,
        entity: customer.id,
        id: '6e278fd8-562e-4435-8a9e-54c238bcd980',
        type: 'sign_up',
      });
    }
  }
}

export async function deleteAllCollections() {
  const collectionNames = ['campaigns', 'conversions', 'customers'];

  for (const collectionName of collectionNames) {
    const querySnapshot = await getDocs(query(collection(db, collectionName)));

    for (const doc of querySnapshot.docs) {
      await deleteDoc(doc.ref);
    }
  }
}

// deleteAllCollections().then(() => createTestData());

// createTestData();

// deleteAllCollections();
