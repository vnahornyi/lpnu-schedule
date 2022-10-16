import { NextPage } from 'next';
import Loading from 'components/UI/Loading';
import { useAppSelector } from 'hooks/useStore';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { translit } from 'utils';

const RedirectPage: NextPage = () => {
    const router = useRouter();
    const {
        selectedGroup,
        subGroup,
        isPrepared
    } = useAppSelector(state => state.settings);

    useEffect(() => {
        if (!isPrepared) return;

        if (!selectedGroup) {
            router.push('/setup');
            return;
        }

        router.push(
            `/schedule/${translit(selectedGroup)}_${subGroup}`.toLowerCase()
        );
    }, [selectedGroup, subGroup, isPrepared, router]);

    return <Loading />;
}

export default RedirectPage;