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
};

const customer: Customer = {
  emailAddress: 'john.smith@example.com',

  firstName: 'John',

  id: 'de66f180-1ca8-4c8b-bad8-ba147fa2cb74',

  lastName: 'Smith',
};

const conversion: Conversion = {
  createdAt: new Date().toISOString(),

  entity: 'john.smith@example.com',

  type: 'sign_up',

  value: 10,
};

console.log(referrer);
console.log(campaign);
console.log(customer);
console.log(conversion);
