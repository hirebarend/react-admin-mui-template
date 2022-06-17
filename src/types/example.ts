import { Campaign } from './campaign';
import { Conversion } from './conversion';
import { Customer } from './customer';
import { Referrer } from './referrer';

const referrer: Referrer = {
  createdAt: new Date().toISOString(),

  id: 'foo.bar@example.com',
};

const campaign: Campaign = {
  code: '8563',

  id: 'de66f180-1ca8-4c8b-bad8-ba147fa2cb74',

  name: 'Campaign 1',

  referrer,

  type: 'sign_up',
};

const customer: Customer = {
  emailAddress: 'john.smith@example.com',

  firstName: 'John',

  id: 'de66f180-1ca8-4c8b-bad8-ba147fa2cb74',

  lastName: 'Smith',
};

const conversion: Conversion = {
  campaign,

  createdAt: new Date().toISOString(),

  createdAtUnix: new Date().getTime() / 1000,

  entity: 'john.smith@example.com',

  id: 'de66f180-1ca8-4c8b-bad8-ba147fa2cb74',

  type: 'sign_up',
};

console.log(referrer);
console.log(campaign);
console.log(customer);
console.log(conversion);
