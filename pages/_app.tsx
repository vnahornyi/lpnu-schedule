import type { AppProps } from 'next/app';
import { ChakraProvider, CSSReset, useColorModeValue } from '@chakra-ui/react';
import { Provider } from 'react-redux';
import theme from 'constants/theme';
import { wrapper } from 'store';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { prepareApp } from 'store/settings';
import { useRouter } from 'next/router';
import Loading from 'components/UI/Loading';

const InfoModal = dynamic(() => import('components/UI/InfoModal'), { ssr: false });

export const ThemedLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isFallback } = useRouter();
  const themeColor = useColorModeValue('white', '#1A202C');

  return <>
    <Head>
      <title>Розклад LPNU</title>
      <meta
        name='viewport'
        content='minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover'
      />
      <meta name="theme-color" content={themeColor} />
    </Head>
    {isFallback ? <Loading /> : children}
  </>;
}

const App: React.FC<AppProps> = ({ Component, ...rest }) => {
  const { store, props } = wrapper.useWrappedStore(rest);
  const { events } = useRouter();
  const [isConfirmed, setConfirmed] = useState<string | null>(null);

  useEffect(() => {
    const isConfirmed = !!localStorage.getItem('confirmed') || window.matchMedia('(display-mode: standalone)').matches;

    setConfirmed(isConfirmed ? '1' : '');
  }, []);

  useEffect(() => {
    const handleUpdateStore = () => {
      const {
        selectedGroup,
        selectedInstitute
      } = store.getState().settings;

      if ((!selectedGroup || !selectedInstitute) && isConfirmed) {
        store.dispatch(prepareApp());
      }
    }
    handleUpdateStore();

    events.on('routeChangeComplete', handleUpdateStore);

    return () => {
      events.off('routeChangeComplete', handleUpdateStore);
    }
  }, [store, events, isConfirmed]);

  const handleClose = () => {
    setConfirmed('1');
    localStorage.setItem('confirmed', '1');
  }

  return (
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <CSSReset />
        <ThemedLayout>
          <Component {...props.pageProps} />
        </ThemedLayout>
        <InfoModal isOpen={isConfirmed === ''} onClose={handleClose} />
      </ChakraProvider>
    </Provider> 
  );
}

export default App;
