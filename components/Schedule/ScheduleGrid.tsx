import {
    Container,
    Stack,
    Text
} from '@chakra-ui/react';

import { ITimetable } from 'types';
import { getWeekday } from 'utils';
import Lesson from './Lesson';

interface IScheduleGridProps {
    timetable: ITimetable[];
}

const ScheduleGrid: React.FC<IScheduleGridProps> = ({ timetable }) => {
    const maxDays = Math.max(...timetable.map(el => el.day));

    if (!timetable?.length) return null;

    return (
        <Container maxW='container.xl' p={{ base: '2', lg: '4' }} pb={{ base: '92px', lg: '4' }}>
            {Array.from({length: maxDays}, (_, i) => i + 1).map((numOfDay: number) => (
                <Stack
                    key={numOfDay}
                    direction='column'
                    spacing='2'
                >
                    <Text
                        fontWeight='bold'
                        fontSize='xl'
                        mt='6' 
                    >
                        {getWeekday(numOfDay)}
                    </Text>
                    <Stack direction={{ base: 'column', lg: 'row' }} spacing={{ base: '2', lg: '4' }}>
                        {timetable.filter(el => el.day === numOfDay).map(({ lesson, position }) => (
                            <Lesson key={position} position={position} lesson={lesson} />
                        ))}
                    </Stack>
                </Stack>
            ))}
        </Container>
    );
}

export default ScheduleGrid;
