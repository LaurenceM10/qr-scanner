import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'app/store/store';

interface QRState {
  QRData: {
    id: number;
    content: string;
  }[];
}

const initialState: QRState = {
  QRData: [],
};

const slice = createSlice({
  name: 'QRReducer',
  initialState: initialState,
  reducers: {
    addQR: (
      state,
      { payload }: PayloadAction<{ id: number; content: string }>,
    ) => {
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
