
import { useBoolean } from '@chakra-ui/react';
import { GetStaticProps, NextPage } from 'next';
import dynamic from 'next/dynamic';
import { wrapper } from 'store';
import { prepareInstitutes } from 'store/settings';
import Setup from 'components/Setup/Setup';

const Settings = dynamic(() => import('components/Settings/Settings'));

const SetupPage: NextPage = () => {
    const [shouldRenderSettings, setShouldRenderSettings] = useBoolean();

    if (!shouldRenderSettings) return <Setup onStart={setShouldRenderSettings.on} />;

    return <Settings />;
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
