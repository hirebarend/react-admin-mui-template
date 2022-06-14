import { Campaign } from './campaign';

export type Conversion = {
  campaign: Campaign;

  createdAt: string;

  entity: string;

  type: string;

  value: number;
};
