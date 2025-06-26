import { configureStore } from '@reduxjs/toolkit';

import authSlice from 'services/state/authSlice';
import { apiCore } from 'services/api/apiCore';

export const store = configureStore({
  reducer: {
    [apiCore.reducerPath]: apiCore.reducer, // all rtk query to manage its state within redux
    auth: authSlice.reducer,
  },

  middleware: (getdefaultMiddleware) =>
    getdefaultMiddleware({ serializableCheck: false }).concat(apiCore.middleware), // ensure api mgmt: hooks generation, caching and endpoint injection.
});
