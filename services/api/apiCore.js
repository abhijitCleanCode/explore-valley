import { createApi } from '@reduxjs/toolkit/query/react';
import { appwriteBaseQuery } from 'services/appwriteBaseQuery';

export const apiCore = createApi({
  reducerPath: 'apiCore',
  baseQuery: appwriteBaseQuery(),
  tagTypes: ['auth', 'news'],
  endpoints: () => ({}),
});
