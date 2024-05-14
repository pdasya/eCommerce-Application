import { apiRoot } from '@/commercetools/client';
import { IUserDraft } from '@/modules/sign-in-form/interface/sign-in-form';

export const signIn = async (userDraft: IUserDraft): Promise<void> => {
  try {
    await apiRoot
      .me()
      .login()
      .post({
        body: userDraft,
      })
      .execute();
  } catch (error) {
    console.error(error);
  }
};
