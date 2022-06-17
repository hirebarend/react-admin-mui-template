import { Md5 } from 'ts-md5';
import { createCampaign } from './create-campaign';
import { createReferrer } from './create-referrer';
import { findReferrer } from './find-referrer';
import { Referrer } from '../types';

export async function initialize(emailAddress: string) {
  const accessToken: string =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJnb29nbGUtb2F1dGgyfDEwODQ1ODAxMzg2MjI2OTc4NTAyMSIsImF1ZCI6IklKUktiYzY5WkFUVjRnVElUM0VPemUxYVlCTWpQVXRGIn0.dOejLWxtO9q63I-oja_kkD-6Fai8smNHJeo9AJUYtdg';

  const referrerId: string = new Md5().appendStr(emailAddress).end().toString();

  const campaignCode: string = generateCampaignCode(5);

  let referrer: Referrer | null = await findReferrer(accessToken, referrerId);

  if (!referrer) {
    referrer = await createReferrer(accessToken, {
      id: referrerId,
    });

    await createCampaign(accessToken, referrer.id, {
      code: campaignCode,
      name: 'Campaign 1',
      type: 'sign_up',
    });
  }
}

function generateCampaignCode(
  length: number,
  characters: string = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'
): string {
  let result: string = '';

  for (let i = length; i > 0; --i) {
    result += characters[Math.floor(Math.random() * characters.length)];
  }

  return result;
}
