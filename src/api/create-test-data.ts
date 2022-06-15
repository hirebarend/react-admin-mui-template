import { Campaign, Customer, Referrer } from '../types';
import { createCampaign } from './create-campaign';
import { createConversion } from './create-conversion';
import { createCustomer } from './create-customer';
import { createReferrer } from './create-referrer';
import { findCampaign } from './find-campaign';
import { findCustomerByEmailAddress } from './find-customer';
import { findReferrer } from './find-referrer';

export async function createTestData() {
  const tenantId: string = 'google-oauth2|102857191578298947818';

  let referrer: Referrer | null = await findReferrer(tenantId, 'c3bdcad669c0');

  if (!referrer) {
    referrer = await createReferrer(tenantId, {
      createdAt: new Date().toISOString(),
      id: 'c3bdcad669c0',
    });
  }

  let campaign: Campaign | null = await findCampaign(tenantId, 'TWDJ1');

  if (!campaign) {
    campaign = await createCampaign(tenantId, {
      code: 'TWDJ1',
      id: '',
      name: 'Campaign 1',
      referrer,
    });
  }

  let customer: Customer | null = await findCustomerByEmailAddress(
    tenantId,
    'john.smith@example.com'
  );

  if (!customer) {
    customer = await createCustomer(tenantId, {
      emailAddress: 'john.smith@example.com',
      firstName: 'John',
      id: '',
      lastName: 'Smith',
    });
  }

  await createConversion(tenantId, {
    campaign,
    createdAt: new Date().toISOString(),
    entity: customer.id,
    id: '',
    type: 'sign_up',
  });
}

createTestData();
