import { Campaign } from './campaign';

export type Conversion = {
  campaign: Campaign;

  createdAt: string;

  id: string;

  entity: string;

  type: string;
};
