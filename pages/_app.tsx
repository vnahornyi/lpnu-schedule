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
import { getCookie, setCookies } from 'cookies-next';
import { REDIRECT } from 'constants/routes';

const InfoModal = dynamic(() => import('components/UI/InfoModal'), { ssr: false });

const App: React.FC<AppProps> = ({ Component, ...rest }) => {
  const { store, props } = wrapper.useWrappedStore(rest);
  const { events } = useRouter();
  const themeColor = useColorModeValue('green.300', 'gray.700');
  const [isConfirmed, setConfirmed] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const isConfirmed = !!getCookie('confirmed') || window.matchMedia('(display-mode: standalone)').matches;

    setConfirmed(isConfirmed ? '1' : '');

    if (!isConfirmed && router.pathname !== REDIRECT) router.replace(REDIRECT);
  }, [router]);

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
    setCookies('confirmed', '1');
    window.location.href = '/';
  }

  return (
    <Provider store={store}>
      <Head>
        <title>Розклад NULP</title>
        <meta
            name='viewport'
            content='minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover'
        />
        <meta name="theme-color" content={themeColor} />
      </Head>
      <ChakraProvider theme={theme}>
        <CSSReset />
        <Component {...props.pageProps} />
        <InfoModal isOpen={isConfirmed === ''} onClose={handleClose} />
      </ChakraProvider>
    </Provider>
    
  );
}

export default App;
