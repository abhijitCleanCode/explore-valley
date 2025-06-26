import authService from 'appwrite/auth.service';
import { apiCore } from './apiCore';

export const authApiSlice = apiCore.injectEndpoints({
  endpoints: (builder) => ({
    createUser: builder.mutation({
      queryFn: (creds) => ({
        endpointFn: () =>
          authService.createUser(creds.email, creds.password, creds.name, creds.role),
      }),

      login: builder.mutation({
        queryFn: (creds) => ({
          endpointFn: () => authService.signInUser(creds.email, creds.password),
        }),
      }),
    }),
  }),
});

export const { useCreateUserMutation, useLoginMutation } = authApiSlice;
