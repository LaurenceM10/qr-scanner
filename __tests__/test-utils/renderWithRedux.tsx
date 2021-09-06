import React from 'react';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react-native';
import { configureStore } from '@reduxjs/toolkit';
import QRReducer from 'features/qrScanner/slice';

interface WrapperProps {
  children: React.ReactElement;
}

function renderWithRedux(
  ui: React.ReactElement,
  {
    preloadedState,
    store = configureStore({ reducer: { QRReducer }, preloadedState }),
    ...renderOptions
  }: any = {},
) {
  function Wrapper({ children }: WrapperProps) {
    return <Provider store={store}>{children}</Provider>;
  }
  return {
    ...render(ui, { wrapper: Wrapper, ...renderOptions }),
    store,
  };
}

export default renderWithRedux;
