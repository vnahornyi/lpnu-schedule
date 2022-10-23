import { ExternalLinkIcon } from '@chakra-ui/icons';
import {
    Box,
    Flex,
    IconButton,
    LinkBox,
    LinkOverlay,
    Stack,
    Text,
    useColorModeValue
} from '@chakra-ui/react';

import { lessonColors } from 'constants/common';
import { ILesson } from 'types';
import { getHours } from 'utils';

interface ILessonProps {
    lesson: ILesson;
    position: number;
}

function checkCurrentLesson(start: string, end: string, day: number): boolean {
    const currentDate = new Date();
    const startTime = +start.replace(':', '.');
    const endTime = +end.replace(':', '.');
    const currentDay = currentDate.getDay() === 0 ? 7 : currentDate.getDate();
    const currentTime = +`${currentDate.getHours()}.${currentDate.getMinutes()}`;

    return currentTime >= startTime && currentTime < endTime && day === currentDay;
}

const Lesson: React.FC<ILessonProps> = ({ lesson, position }) => {
    const lessonColor = lessonColors[lesson.type as 'lab'];
    const [start, end] = getHours(position);
    const isCurrentLesson = checkCurrentLesson(start, end, lesson.day);
    const lessonColorNotCurrent = useColorModeValue('gray.100', 'gray.700');
    const textColor = useColorModeValue('black', 'white');

    return (
        <Flex justifyContent='space-evenly'>
            <Box w='20px' h='auto'>
                <Stack direction='column' spacing='2' h='100%' alignItems='center'>
                    <Box
                        w='20px'
                        h='20px'
                        rounded='full'
                        border='2px solid'
                        borderColor={lessonColor}
                        p='0.5'
                    >
                        {isCurrentLesson && (
                            <Box
                                w='full'
                                h='100%'
                                bg={lessonColor}
                                rounded='full'
                            />
                        )}
                    </Box>
                    <Box w='2px' h='calc(100% - 20px)' bg={lessonColor} />
                </Stack>
            </Box>
            <LinkBox
                w='85%'
                minH={{ base: 'auto', lg: '28px' }}
                h='auto'
                p={{ base: '4', lg: '6' }}
                bgColor={isCurrentLesson ? lessonColor : lessonColorNotCurrent}
                color={isCurrentLesson ? 'white' : textColor}
                rounded={{ base: 'xl', lg: '3xl' }}
            >
                <Flex
                    direction='row'
                    h='100%'
                    justify='space-between'
                    align={{ base: 'center', lg: 'flex-start' }}
                >
                    <Stack direction='column' spacing={1} mr='15px'>
                        <Text
                            fontSize={{ base: 'md', lg: 'lg' }}
                            fontWeight='bold'
                        >
                            {lesson.subject}
                        </Text>
                        <Text
                            fontSize={{ base: 'sm', lg: 'md' }}
                        >
                            {lesson.lecturer}
                        </Text>
                        <Text
                            as='strong'
                            fontSize={{ base: 'sm', lg: 'md' }}
                        >
                            {lesson.location}
                        </Text>
                    </Stack>
                    <Flex
                        direction='column'
                        justify='center'
                        gap='2'
                    >
                        <Text fontWeight='bold' fontSize={{ base: 'md', lg: 'lg' }}>
                            {start}
                        </Text>
                        {lesson.urls?.length > 0 && (
                            <LinkOverlay href={lesson.urls[0]} isExternal>
                                <IconButton
                                    aria-label={lesson.urls[0]}
                                    icon={<ExternalLinkIcon w='5' h='5' />}
                                    variant='link'
                                    color={isCurrentLesson ? 'white' : 'initial'}
                                />
                            </LinkOverlay>
                        )}
                    </Flex>
                </Flex>
            </LinkBox>
        </Flex>
    );
}

export default Lesson;
