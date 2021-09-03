import { configureStore } from '@reduxjs/toolkit';

// Reducer
import QRReducer from 'features/qrScanner/slice';

export const store = configureStore({
  reducer: {
    QRReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
