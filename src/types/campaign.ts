import { Referrer } from './referrer';

export type Campaign = {
  code: string;

  id: string;

  name: string;

  referrer: Referrer;

  type: string;
};
