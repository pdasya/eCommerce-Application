import { apiFlowManager } from '@config/constants';

const getDiscountCodeName = async (ID: string) =>
  apiFlowManager.getClient().discountCodes().withId({ ID }).get().execute();

export const getDiscountCodeNameEndpoint = async (ID: string) => {
  try {
    const discountName = (await getDiscountCodeName(ID)).body.name;
    return discountName;
  } catch (error) {
    console.error(error);
    return '';
  }
};
