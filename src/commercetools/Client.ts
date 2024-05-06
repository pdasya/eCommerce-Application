import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { client } from './BuildClient';
import { projectKey } from '../constants/constants';
import assertIsDefined from '../asserts/asserts';

assertIsDefined(projectKey);
export const apiRoot = createApiBuilderFromCtpClient(client).withProjectKey({ projectKey });
