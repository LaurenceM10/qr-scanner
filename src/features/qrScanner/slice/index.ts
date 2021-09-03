import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'app/store/store';

interface QRState {
  QRData: {
    id: number;
    url: string;
  }[];
}

const initialState: QRState = {
  QRData: [],
};

const slice = createSlice({
  name: 'QRReducer',
  initialState: initialState,
  reducers: {
    addQR: (state, { payload }: PayloadAction<{ id: number; url: string }>) => {
      state.QRData.push({
        id: payload.id,
        url: payload.url,
      });
    },
  },
});

export const selectQRData = (state: RootState) => state.QRReducer.QRData;

export const { addQR } = slice.actions;
export default slice.reducer;
