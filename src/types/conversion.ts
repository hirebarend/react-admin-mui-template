import { Campaign } from './campaign';

export type Conversion = {
  campaign: Campaign;

  createdAt: string;

  createdAtUnix: number;

  id: string;

  entity: string;

  type: string;
};
