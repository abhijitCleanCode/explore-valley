export const appwriteBaseQuery =
  () =>
  async ({ endpointFn }) => {
    console.log('baseQuery: calling endpointFn');
    try {
      const data = await endpointFn();

      return { data };
    } catch (error) {
      console.log('services :: appwriteBaseQuery :: error :: ', error);
      return {
        error: {
          status: error.code || 500,
          message: error.message || 'Something went wrong',
        },
      };
    }
  };
