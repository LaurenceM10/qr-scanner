import React from 'react';
import { cleanup, fireEvent } from '@testing-library/react-native';

import QRListScreen from 'features/qrScanner/views/QRListScreen';
import renderWithRedux from '../../../test-utils/renderWithRedux';

const QRState = {
  QRData: [
    { id: 1, content: 'www.facebook.com' },
    { id: 2, content: 'www.youtube.com' },
    { id: 3, content: 'www.twitter.com' },
    { id: 4, content: 'www.github.com' },
  ],
};

afterEach(cleanup);

describe('<QRListScreen />', function () {
  it('should render the ReadQRScreen component when there is no permission', function () {
    const { toJSON } = renderWithRedux(<QRListScreen />);

    expect(toJSON()).toMatchSnapshot();
  });

  it('should render a FlatList of QR items from the redux store', function () {
    const preloadedState = { QRReducer: QRState };
    const { queryByText } = renderWithRedux(<QRListScreen />, {
      preloadedState,
    });

    expect(queryByText(/twitter/)).toBeTruthy();
  });

  it('should filter a list of QR items based on input value', function () {
    const preloadedState = { QRReducer: QRState };
    const { getByPlaceholderText, queryByText } = renderWithRedux(
      <QRListScreen />,
      { preloadedState },
    );

    const input = getByPlaceholderText('Search');
    expect(input).toBeTruthy();

    fireEvent.changeText(input, 'twit');

    expect(queryByText(/twit/)).toBeTruthy();
    expect(queryByText(/youtube/)).toBeNull();
    expect(queryByText(/github/)).toBeNull();
  });

  it('should render <NoResults /> when no items are found based on the filter', function () {
    const preloadedState = { QRReducer: QRState };
    const { getByPlaceholderText, getByTestId, queryByText } = renderWithRedux(
      <QRListScreen />,
      { preloadedState },
    );

    const input = getByPlaceholderText('Search');
    expect(input).toBeTruthy();

    fireEvent.changeText(input, 'nicasource');

    expect(queryByText(/nicasource/)).toBeNull();
    expect(getByTestId('NoResults')).toBeTruthy();
  });

  it('should render <NoData /> when there are no QR items saved', function () {
    const preloadedState = { QRReducer: { QRData: [] } };
    const { getByTestId } = renderWithRedux(<QRListScreen />, {
      preloadedState,
    });

    expect(getByTestId('NoData')).toBeTruthy();
  });
});
