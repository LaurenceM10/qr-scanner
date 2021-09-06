import reducer, { addQR } from '../../../../src/features/qrScanner/slice';
import { AnyAction } from 'redux';

describe('QR Reducer', function () {
  it('should return the initial state', function () {
    expect(reducer(undefined, {} as AnyAction)).toEqual({
      QRData: [],
    });
  });

  it('should update the QR state with a new item', function () {
    // arrange
    const previousState = { QRData: [] };
    const qrItem = { id: Date.now(), content: 'www.facebook.com' };

    // act
    const QRState = reducer(previousState, addQR(qrItem));

    // assert
    expect(QRState.QRData.length).toBeTruthy();
    expect(QRState).toEqual({ QRData: [qrItem] });
  });
});
