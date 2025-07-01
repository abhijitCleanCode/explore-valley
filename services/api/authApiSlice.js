import authService from 'appwrite/auth.service';
import { apiCore } from 'services/api/apiCore';

export const authApiSlice = apiCore.injectEndpoints({
  endpoints: (builder) => ({
    createUser: builder.mutation({
      async queryFn(creds) {
        try {
          const data = await authService.createUser(
            creds.email,
            creds.password,
            creds.name,
            (creds.role = 'user')
          );
          return { data };
        } catch (error) {
          console.log('services :: authApiSlice :: createUser :: error: ', error);
          return {
            error: {
              status: error.code || 500,
              message: error.message || 'Something went wrong',
            },
          };
        }
      },
    }),

    login: builder.mutation({
      async queryFn(creds) {
        try {
          const data = await authService.signInUser(creds.email, creds.password);
          return { data };
        } catch (error) {
          console.log('services :: authApiSlice :: login :: error: ', error);
          return {
            error: {
              status: error.code || 500,
              message: error.message || 'Something went wrong',
            },
          };
        }
      },
    }),

    getCurrentUser: builder.query({
      async queryFn() {
        try {
          const data = await authService.getCurrentUser();
          return { data };
        } catch (error) {
          console.log('services :: authApiSlice :: getCurrentUser :: error: ', error);
          return {
            error: {
              status: error.code || 500,
              message: error.message || 'Something went wrong',
            },
          };
        }
      },
    }),

    logout: builder.mutation({
      async queryFn() {
        try {
          const data = await authService.signOutUser();
          return { data };
        } catch (error) {
          console.log('services :: authApiSlice :: logout :: error: ', error);
          return {
            error: {
              status: error.code || 500,
              message: error.message || 'Something went wrong',
            },
          };
        }
      },
    }),
  }),
  overrideExisting: false,
});

export const {
  useCreateUserMutation,
  useLoginMutation,
  useLazyGetCurrentUserQuery,
  useLogoutMutation,
} = authApiSlice;
