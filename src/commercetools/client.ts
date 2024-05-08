import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { client } from './build-client';
import { projectKey } from '../config/constants';
import assertIsDefined from '../types/asserts';

assertIsDefined(projectKey);
export const apiRoot = createApiBuilderFromCtpClient(client).withProjectKey({ projectKey });
