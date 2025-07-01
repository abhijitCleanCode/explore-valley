import { fetchBaseQuery } from '@reduxjs/toolkit/query';
import { createApi } from '@reduxjs/toolkit/query/react';
import { appwriteBaseQuery } from 'services/appwriteBaseQuery';

export const apiCore = createApi({
  reducerPath: 'apiCore',
  baseQuery: fetchBaseQuery({}),
  endpoints: () => ({}),
  tagTypes: ['auth', 'news'],
});
