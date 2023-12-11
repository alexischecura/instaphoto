import { configureStore } from '@reduxjs/toolkit';
import authSlice from './auth/authSlice';
import followSlice from './follow/followSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    follow: followSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
