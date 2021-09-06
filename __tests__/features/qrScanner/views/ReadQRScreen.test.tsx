import React, { useEffect } from 'react';
import { Alert, View } from 'react-native';

import ReadQRScreen from 'features/qrScanner/views/ReadQRScreen';
import renderWithRedux from '../../../test-utils/renderWithRedux';

jest.mock('app/hooks/useScannerPermission', () => ({
  useScannerPermission: jest
    .fn()
    .mockReturnValueOnce(null)
    .mockReturnValueOnce(false)
    .mockReturnValue(true),
}));

function MockBarCodeScanner(
  onBarCodeScanned?: ({ data }: { data: string }) => void,
) {
  useEffect(() => {
    if (onBarCodeScanned) {
      onBarCodeScanned({ data: 'www.nicasource.com ' });
    }
  }, [onBarCodeScanned]);

  return <View />;
}

jest.mock('expo-barcode-scanner', () => ({
  BarCodeScanner: ({
    onBarCodeScanned,
  }: {
    onBarCodeScanned: ({ data }: { data: string }) => void;
  }) => MockBarCodeScanner(onBarCodeScanned),
}));

const spyAlert = jest.spyOn(Alert, 'alert');

afterEach(() => jest.clearAllMocks());

describe('<ReadQRScreen />', function () {
  it('should render the ReadQRScreen component when is requesting camera permission', function () {
    const message = 'Requesting for camera permission';
    const { toJSON, queryByText } = renderWithRedux(<ReadQRScreen />);

    expect(toJSON()).toMatchSnapshot();
    expect(queryByText(message)).toBeTruthy();
  });

  it('should render error message when there is no access to camera', function () {
    const message = 'No access to camera';
    const { queryByText } = renderWithRedux(<ReadQRScreen />);

    expect(queryByText(message)).toBeTruthy();
  });

  it('should render scanner when there is access to camera', function () {
    const { queryByTestId } = renderWithRedux(<ReadQRScreen />);

    expect(queryByTestId('ScannerContainer')).toBeTruthy();
  });

  it('should show confirmation Alert after scan element', function () {
    const { queryByTestId } = renderWithRedux(<ReadQRScreen />);

    expect(queryByTestId('ScannerContainer')).toBeTruthy();
    expect(spyAlert).toHaveBeenCalledTimes(1);
  });

  it('should save the QR item in the store if the user press the save option', function () {
    const { store } = renderWithRedux(<ReadQRScreen />);

    expect(spyAlert).toHaveBeenCalledTimes(1);
    // @ts-ignore - press the save alert option
    spyAlert.mock.calls[0][2][1].onPress();

    expect(store.getState().QRReducer.QRData.length).toBe(1);
  });
});
