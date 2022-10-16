import { Container, Flex, Text } from '@chakra-ui/react';
import { NextPage } from 'next';

const OfflinePage: NextPage = () => {
    return <Container maxW='container.xl'>
        <Flex minH='100vh' justify='center' align='center'>
            <Text fontWeight='bold' fontSize='3xl'>
                Немає доступу до інтернету :(
            </Text>
        </Flex>
    </Container>;
}

export default OfflinePage;
