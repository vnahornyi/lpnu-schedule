import { useMemo } from 'react';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import Header from 'components/Schedule/Header';
import { Container, Fade, Text, useBreakpointValue } from '@chakra-ui/react';
import useBrowser from 'hooks/useBrowser';
import dynamic from 'next/dynamic';
import { wrapper } from 'store';
import { setServerStore } from 'store/settings';
import { prepareLessons } from 'store/schedule';
import { useAppSelector } from 'hooks/useStore';
import { getWeek, testSubgroup, testWeek } from 'utils';
import { translit } from 'utils';
import { getInstitutes } from 'api';

const Grid = dynamic(() => import('components/Schedule/ScheduleGrid'));
const Footer = dynamic(() => import('components/UI/Footer'));

const SchedulePage: NextPage = () => {
    const isBrowser = useBrowser();
    const isTabletWidth = useBreakpointValue({ base: true, lg: false });
    const lessons = useAppSelector(state => state.schedule.lessons);
    const { serverSubGroup, serverGroup } = useAppSelector(state => state.settings);
    const week = getWeek() % 2 === 0 ? 2 : 1;

    const timetable = useMemo(() => {
        return lessons.filter(lesson => testWeek(lesson, week) && testSubgroup(lesson, serverSubGroup ?? 1))
            .map(el => ({
                day: el.day,
                position: el.number,
                lesson: el
            }));
    }, [week, serverSubGroup, lessons]);
    
    return (
        <Fade in={isBrowser}>
            <Header />
            <Container maxW='container.xl' p='4' pt='20'>
                <Text
                    fontSize='2xl'
                    fontWeight='bold'
                >
                    Група: {serverGroup}, підгрупа: {serverSubGroup}
                </Text>
                <Grid timetable={timetable} />
            </Container>
            {isTabletWidth && <Footer />}
        </Fade>
    );
}

export const getStaticProps: GetStaticProps = wrapper.getStaticProps(store =>
    async ({ params }) => {
        try {
            const [group, subgroup] = (params?.group as string).split('_');
            const modifiedGroup = translit(group, true).toUpperCase();

            if (isNaN(+subgroup) || !modifiedGroup) {
                return {
                    notFound: true
                }
            }

            store.dispatch(setServerStore({ group: modifiedGroup, subgroup: +subgroup }));
            await store.dispatch(prepareLessons(modifiedGroup));

            return {
                revalidate: 60,
                props: {}
            }
        } catch {
            return {
                notFound: true
            }
        }
    }
);

export const getStaticPaths: GetStaticPaths = async () => {
    try {
        const groups = (await getInstitutes())
            .reduce((arr: string[], el) => [ ...arr, ...el.groups ], [])
            .map(group => translit(group.toLowerCase()));

        return {
            paths: [
                ...groups.map(el => ({ params: { group: `${el}_1` } })),
                ...groups.map(el => ({ params: { group: `${el}_2` } }))
            ],
            fallback: 'blocking'
        }
    } catch {
        return {
            fallback: 'blocking',
            paths: []
        }
    }
}

export default SchedulePage;
