import { Md5 } from 'ts-md5';
import {
  createConversion,
  createCustomer,
  findCampaignByCode,
  findCustomerByEmailAddress,
} from '../api';
import { Campaign, Customer } from '../types';

export function getApiClient(accessToken: string | null) {
  return {
    createConversion: async (
      campaignCode: string,
      firstName: string,
      lastName: string,
      emailAddress: string,
      type: string
    ) => {
      const campaign: Campaign | null = await findCampaignByCode(
        accessToken,
        campaignCode
      );

      if (!campaign) {
        throw new Error();
      }

      let customer: Customer | null = await findCustomerByEmailAddress(
        accessToken,
        emailAddress
      );

      if (!customer) {
        customer = await createCustomer(accessToken, {
          emailAddress,
          firstName,
          lastName,
        });
      }

      await createConversion(accessToken, campaign.code, {
        entity: customer.id,
        id: `${new Md5()
          .appendStr(`${campaign.type}-${customer.emailAddress}-${type}`)
          .end()}`,
        type,
      });
    },
  };
}
