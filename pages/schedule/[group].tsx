import { useCallback, useMemo } from 'react';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import {
    Container,
    Fade,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    useColorModeValue
} from '@chakra-ui/react';
import useBrowser from 'hooks/useBrowser';
import dynamic from 'next/dynamic';
import { wrapper } from 'store';
import { setServerStore } from 'store/settings';
import { prepareLessons } from 'store/schedule';
import { useAppSelector } from 'hooks/useStore';
import { getWeek, testSubgroup, testWeek } from 'utils';
import { translit } from 'utils';
import { getInstitutes } from 'api';
import DashboardLayout from 'layouts/DashboardLayout';
import useDate from 'hooks/useDate';

const Grid = dynamic(() => import('components/Schedule/ScheduleGrid'));

export const FormatedTab: React.FC<{ day: number }> = ({ day }) => {
    const date = useDate({ type: 'small', day });

    return (
        <Tab
            w='calc(100% / 7)'
            color={useColorModeValue('black', 'white')}
            dangerouslySetInnerHTML={{ __html: date.replace(',', '<br>') }}
            _selected={{
                bgColor: 'transparent',
                color: useColorModeValue('green.500', 'green.300')
            }}
        />
    );
}

const SchedulePage: NextPage = () => {
    const isBrowser = useBrowser();
    const lessons = useAppSelector(state => state.schedule.lessons);
    const { serverSubGroup } = useAppSelector(state => state.settings);
    const week = getWeek() % 2 === 0 ? 2 : 1;
    const currentDay = new Date().getDay() === 0 ? 6 : new Date().getDay() - 1;

    const timetable = useMemo(() => {
        return lessons
            .filter(lesson => testWeek(lesson, week) && testSubgroup(lesson, serverSubGroup ?? 1))
            .map(el => ({
                day: el.day,
                position: el.number,
                lesson: {
                    ...el,
                    location: el.location.includes(',')
                        ? el.location.substring(2) : el.location
                }
            }));
    }, [week, serverSubGroup, lessons]);

    const renderTabs = useCallback(() => {
        const currDay = new Date().getDay();
        const days = [];

        for (let i = 0; i < 7; i++) {
            days.push(i - (currDay === 0 ? 6 : currDay - 1));
        }

        return days.map(day => <FormatedTab key={day} day={day} />);
    }, []);

    return (
        <DashboardLayout>
            <Fade in={isBrowser}>
                <Container maxW='container.xl'>
                    <Tabs variant='soft-rounded' defaultIndex={currentDay} isLazy>
                        <TabList>
                            {renderTabs()}
                        </TabList>
                        <TabPanels>
                            {[1,2,3,4,5,6,7].map(day => (
                                <TabPanel key={day} p='0' py='4'>
                                    <Grid timetable={timetable.filter(el => el.day === day)} />
                                </TabPanel>
                            ))}
                        </TabPanels>
                    </Tabs>
                </Container>
            </Fade>
        </DashboardLayout>
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
            fallback: true
        }
    } catch {
        return {
            fallback: true,
            paths: []
        }
    }
}

export default SchedulePage;
