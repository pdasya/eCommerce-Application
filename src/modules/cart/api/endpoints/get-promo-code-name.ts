import { apiFlowManager } from '@config/constants';

const getPromoCodeName = async (ID: string) =>
  apiFlowManager.getClient().discountCodes().withId({ ID }).get().execute();

export const getPromoCodeNameEndpoint = async (ID: string) => {
  try {
    const promoName = (await getPromoCodeName(ID)).body.name;
    return promoName;
  } catch (error) {
    console.error(error);
    return '';
  }
};
