export const appwriteBaseQuery =
  () =>
  async ({ endpointFn }) => {
    try {
      const data = await endpointFn();

      return { data };
    } catch (error) {
      console.log('services :: appwriteBaseQuery :: error :: ', error);
      return { error };
    }
  };
