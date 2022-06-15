import { Campaign, Conversion } from '../types';
import { countConversionsByCampaignCode } from './count-conversions';
import {
  findCampaignByCode,
  findTenantIdByCampaignCode,
} from './find-campaign';
import { findConversionsByCampaignCode } from './find-conversions';
import { findCustomer } from './find-customer';

export async function getPortalState(campaignCode: string) {
  const tenantId: string | null = await findTenantIdByCampaignCode(
    campaignCode
  );

  if (!tenantId) {
    return null;
  }

  const campaign: Campaign | null = await findCampaignByCode(
    tenantId,
    campaignCode
  );

  if (!campaign) {
    return null;
  }

  const conversions = await findConversionsByCampaignCode(
    tenantId,
    campaignCode
  );

  return {
    campaign,
    conversions: await Promise.all(
      conversions.map((x) => getConversionCustomer(tenantId, x))
    ),
    count: await countConversionsByCampaignCode(tenantId, campaignCode),
  };
}

async function getConversionCustomer(tenantId: string, conversion: Conversion) {
  return {
    ...conversion,
    customer: await findCustomer(tenantId, conversion.entity),
  };
}
