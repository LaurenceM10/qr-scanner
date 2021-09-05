import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'app/store/store';
import { QRItem, QRState } from 'features/qrScanner/slice/types';

const initialState: QRState = {
  QRData: [],
};

const slice = createSlice({
  name: 'QRReducer',
  initialState: initialState,
  reducers: {
    addQR: (state, { payload }: PayloadAction<QRItem>) => {
      state.QRData.push({
        id: payload.id,
        content: payload.content,
      });
    },
  },
});

export const selectQRData = (state: RootState) => state.QRReducer.QRData;

export const { addQR } = slice.actions;
export default slice.reducer;
