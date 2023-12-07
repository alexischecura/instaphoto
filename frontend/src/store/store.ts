import { configureStore } from '@reduxjs/toolkit';
import authSlice from './auth/authSlice';
import suggestionsSlice from './suggestions/suggestionsSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    suggestions: suggestionsSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
