import { Container, Flex, Link, Text } from '@chakra-ui/react';
import { NextPage } from 'next';

const NotFoundPage: NextPage = () => {
    const hangleClearCache = (e: { preventDefault: () => void }) => {
        e.preventDefault();
        localStorage.clear();
        window.location.href = '/';
    }

    return <Container maxW='container.xl'>
        <Flex minH='100vh' justify='center' align='center'>
            <Text align='center' fontWeight='bold' fontSize='3xl'>
                404 | Цю сторінку не знайдено :(<br/>
                <Link onClick={hangleClearCache} color='cyan.500'>
                    Очистити кеш
                </Link>
            </Text>
        </Flex>
    </Container>;
}

export default NotFoundPage;
