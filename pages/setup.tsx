
import {
    Box,
    Button,
    useBoolean,
    useColorModeValue
} from '@chakra-ui/react';

import { GetStaticProps, NextPage } from 'next';
import dynamic from 'next/dynamic';
import { wrapper } from 'store';
import { prepareInstitutes } from 'store/settings';
import Setup from 'components/Setup/Setup';
import { useAppSelector } from 'hooks/useStore';
import { useRouter } from 'next/router';
import { REDIRECT } from 'constants/routes';
import Head from 'next/head';

const Settings = dynamic(() => import('components/Settings/Settings'));

const SetupPage: NextPage = () => {
    const [shouldRenderSettings, setShouldRenderSettings] = useBoolean();
    const themeColor = useColorModeValue('#68D391', '#1A202C');
    const router = useRouter();

    const {
        selectedGroup,
        selectedInstitute
    } = useAppSelector(state => state.settings);

    const isDisabled = !selectedGroup || !selectedInstitute;

    if (!shouldRenderSettings) return (
        <>
            <Head>
                <meta name="theme-color" content={themeColor} />
            </Head>
            <Setup onStart={setShouldRenderSettings.on} />
        </>
    );

    const handleConfirm = () => {
        router.push(REDIRECT);
    }

    return (
        <Box minH='100vh' w='full'>
            <Settings />
            <Box
                as='footer'
                p='4'
                pb='25px'
                w='full'
                pos='fixed'
                bottom='0'
                borderTop='1px solid'
                borderColor='gray.300'
            >
                <Button
                    w='full'
                    maxW='560px'
                    mx='auto'
                    display='block'
                    colorScheme='green'
                    disabled={isDisabled}
                    onClick={handleConfirm}
                >
                    Підтвердити
                </Button>
            </Box>
        </Box>
    );
}

export const getStaticProps: GetStaticProps = wrapper.getStaticProps(store =>
    async () => {
        try {
            await store.dispatch(prepareInstitutes());

            return {
                revalidate: 28800,
                props: {}
            }
        } catch (err) {
            console.error(err);
            
            return {
                notFound: true
            }
        }
    }
);

export default SetupPage;
