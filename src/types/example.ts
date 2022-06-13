import { Conversion } from './conversion';
import { Referrer } from './referrer';

const referrer: Referrer = {
  code: '8563',

  id: 'fe5711f7-62d6-4cdb-8834-1060fd53f83c',

  key: 'foo.bar@example.com',
};

const conversion: Conversion = {
  createdAt: new Date().toISOString(),

  key: 'john.smith@example.com',

  type: 'sign_up',
};

console.log(referrer);
console.log(conversion);
