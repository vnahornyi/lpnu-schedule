import { GetStaticProps, NextPage } from 'next';
import dynamic from 'next/dynamic';
import { wrapper } from 'store';
import { prepareInstitutes } from 'store/settings';
import { useAppSelector } from 'hooks/useStore';
import Loading from 'components/UI/Loading';
import DashboardLayout from 'layouts/DashboardLayout';

const Settings = dynamic(() => import('components/Settings/Settings'), { ssr: false });

const SettingsPage: NextPage = () => {
    const isPrepared = useAppSelector(state => state.settings.isPrepared);

    if (!isPrepared) return <Loading />;

    return (
        <DashboardLayout>
            <Settings />
        </DashboardLayout>
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

export default SettingsPage;
