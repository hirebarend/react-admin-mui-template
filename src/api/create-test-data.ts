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
  const accessToken: string =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJnb29nbGUtb2F1dGgyfDEwMjg1NzE5MTU3ODI5ODk0NzgxOCJ9.bcjXs3eiRx846cwJBCUQe9Veuih0Co32PXDQGem9VRs';

  let referrer: Referrer | null = await findReferrer(
    accessToken,
    'c3bdcad669c0'
  );

  if (!referrer) {
    referrer = await createReferrer(accessToken, {
      id: 'c3bdcad669c0',
    });
  }

  let campaign: Campaign | null = await findCampaignByCode(
    accessToken,
    'TWDJ1'
  );

  if (!campaign) {
    campaign = await createCampaign(accessToken, referrer.id, {
      code: 'TWDJ1',
      name: 'Campaign 1',
      type: '',
    });
  }

  const response = await axios.get(
    'https://randomuser.me/api?nat=gb&results=1'
  );

  for (const x of response.data.results) {
    let customer: Customer | null = await findCustomerByEmailAddress(
      accessToken,
      x.email
    );

    if (!customer) {
      customer = await createCustomer(accessToken, {
        emailAddress: x.email,
        firstName: x.name.first,
        lastName: x.name.last,
      });

      await createConversion(accessToken, campaign.code, {
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
