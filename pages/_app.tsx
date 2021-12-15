import '../scripts/wdyr';
import '../styles/globals.css';

import { useAppDispatch } from 'hooks/use-app-dispatch';
import type { AppProps } from 'next/app';
import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import store from 'store';
import { setAppInitialized } from 'store/slices/app-slice';
import { checkUser } from 'store/slices/user-slice';

// this is a commonplace where initial dispatchers need be called since redux isn't working server side atm on 11 Nov'21. But be careful we only need to dispatch here if the dispatch is required for 100% of the pages in the app, which is most probably not going to be the case.

const InitialDispatcher = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setAppInitialized());
    dispatch(checkUser());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
};

function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <InitialDispatcher />
      <Component {...pageProps} />
    </Provider>
  );
}

export default App;
