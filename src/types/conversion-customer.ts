import { Campaign } from './campaign';
import { Customer } from './customer';

export type ConversionCustomer = {
  campaign: Campaign;

  createdAt: string;

  customer: Customer | null;

  id: string;

  entity: string;

  type: string;
};
