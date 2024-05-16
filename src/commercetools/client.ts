import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { client } from './build-client';
import { projectKey } from '../config/constants';

export const apiRoot = createApiBuilderFromCtpClient(client).withProjectKey({ projectKey });
