import {
    Container,
    Stack,
    Text
} from '@chakra-ui/react';

import { ITimetable } from 'types';
import Lesson from './Lesson';

interface IScheduleGridProps {
    timetable: ITimetable[];
}

const ScheduleGrid: React.FC<IScheduleGridProps> = ({ timetable }) => {
    if (!timetable?.length) return (
        <Text
            align='center'
            my='20'
            fontSize='xl'
            fontWeight='bold'
        >
            Сьогодні вихідний,<br />можете відпочити :)
        </Text>
    );

    return (
        <Container maxW='container.xl' px='0' pt={{ base: '5', lg: '10' }} pb={{ base: '90px', lg: '4' }}>
            <Stack direction='column' spacing={{ base: '2', lg: '4' }}>
                {timetable.map(({ lesson, position }) => (
                    <Lesson key={position} position={position} lesson={lesson} />
                ))}
            </Stack>
        </Container>
    );
}

export default ScheduleGrid;
