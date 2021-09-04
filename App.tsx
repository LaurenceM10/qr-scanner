import React from 'react';

// Navigation
import Navigation from 'app/navigation';

// Redux
import store from 'app/store';
import { Provider } from 'react-redux';

function App() {
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
}

export default App;
