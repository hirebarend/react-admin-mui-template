import { Md5 } from 'ts-md5';
import {
  createConversion,
  createCustomer,
  findCampaignByCode,
  findCustomerByEmailAddress,
} from '../api';
import { Campaign, Customer } from '../types';

export function getApiClient(tenantId: string) {
  return {
    createConversion: async (
      campaignCode: string,
      firstName: string,
      lastName: string,
      emailAddress: string,
      type: string
    ) => {
      const campaign: Campaign | null = await findCampaignByCode(
        tenantId,
        campaignCode
      );

      if (!campaign) {
        throw new Error();
      }

      let customer: Customer | null = await findCustomerByEmailAddress(
        tenantId,
        emailAddress
      );

      if (!customer) {
        customer = await createCustomer(tenantId, {
          emailAddress,
          firstName,
          id: '',
          lastName,
        });
      }

      await createConversion(tenantId, {
        campaign,
        createdAt: new Date().toISOString(),
        createdAtUnix: new Date().getTime() / 1000,
        entity: customer.id,
        id: `${campaign.code}-${new Md5().appendStr(
          customer.emailAddress
        )}-${type}`,
        type,
      });
    },
  };
}
