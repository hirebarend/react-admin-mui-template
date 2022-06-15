import { User } from '@auth0/auth0-react';
import { Md5 } from 'ts-md5';

export function getTenantId(user: User | undefined): string {
  if (!user) {
    return '';
  }

  if (!user.sub) {
    return '';
  }

  return new Md5().appendStr(user.sub).end().toString();
}
