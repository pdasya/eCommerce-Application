import { apiFlowManager } from '@config/constants';

const getPromoCodeInfo = async (ID: string) =>
  apiFlowManager.getClient().discountCodes().withId({ ID }).get().execute();

export const getPromoCodeInfoEndpoint = async (ID: string) => {
  try {
    const promoName = (await getPromoCodeInfo(ID)).body.key;
    return { promoName, ID };
  } catch (error) {
    console.error(error);
    return '';
  }
};
