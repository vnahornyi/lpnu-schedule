import { ExternalLinkIcon } from '@chakra-ui/icons';
import { Flex, IconButton, LinkBox, LinkOverlay, Text } from '@chakra-ui/react';
import { lessonColors } from 'constants/common';
import { ILesson } from 'types';
import { getHours } from 'utils';

interface ILessonProps {
    lesson: ILesson;
    position: number;
}

const Lesson: React.FC<ILessonProps> = ({ lesson, position }) => {
    const lessonColor = lessonColors[lesson.type as 'lab'];
    const [start, end] = getHours(position);

    return (
        <LinkBox
            w='full'
            minH={{ base: 'auto', lg: '28px' }}
            h='auto'
            p='2'
            bgColor={lessonColor}
            rounded='xl'
        >
            <Flex direction={{ base: 'row', lg: 'column' }} h='100%' justify='space-between' align={{ base: 'center', lg: 'flex-start' }}>
                <Text
                    color='white'
                    fontSize='md'
                    fontWeight='bold'
                >
                    {lesson.subject}<br/>
                    <Text as='span' fontWeight='normal'>{lesson.lecturer} | {lesson.location}</Text>
                    <br />
                    <Text as='span' fontWeight='900'>{start} - {end}</Text>
                </Text>
                {lesson.urls?.length > 0 && (
                    <LinkOverlay href={lesson.urls[0]} isExternal>
                        <IconButton
                            aria-label={lesson.urls[0]}
                            icon={<ExternalLinkIcon w='5' h='5' />}
                            variant='link'
                            color='white'
                        />
                    </LinkOverlay>
                )}
            </Flex>
        </LinkBox>
    );
}

export default Lesson;
