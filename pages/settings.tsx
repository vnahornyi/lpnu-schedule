import { GetStaticProps, NextPage } from 'next';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { wrapper } from 'store';
import { prepareInstitutes } from 'store/settings';
import { useAppSelector } from 'hooks/useStore';
import Loading from 'components/UI/Loading';
import { Fade } from '@chakra-ui/react';

const Settings = dynamic(() => import('components/Settings/Settings'), { ssr: false });

const SettingsPage: NextPage = () => {
    const router = useRouter();
    const isPrepared = useAppSelector(state => state.settings.isPrepared);

    const handleGoBack = () => {
        router.back();
    }

    if (!isPrepared) return <Loading />;

    return <Fade in={true}><Settings onBack={handleGoBack} /></Fade>;
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

export default SettingsPage;
