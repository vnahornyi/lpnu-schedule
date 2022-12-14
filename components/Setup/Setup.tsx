import {
    Box,
    Button,
    Container,
    Flex,
    Stack,
    Text,
    useBreakpointValue,
    useColorModeValue
} from '@chakra-ui/react';

import ChakraNextImage from 'components/UI/ChakraNextImage';
import ThemePicker from 'components/UI/ThemePicker';

const Setup: React.FC<{ onStart: () => void }> = ({ onStart }) => {
    const logoSizes = useBreakpointValue({ base: 160, md: 220 });
    
    return (
        <Container maxW='full' minH='100vh' bg={useColorModeValue('green.400', 'gray.800')}>
            <Flex justify='center' align='center' minH='inherit'>
                <Box maxW='md' w='100%' p='5' color='white'>
                    <Flex justify='center'>
                        <ChakraNextImage
                            src='/assets/logo.png'
                            width={logoSizes}
                            height={logoSizes}
                            alt='logo'
                            mb='4'
                            draggable={false}
                            priority
                        />
                    </Flex>
                    <Text
                        as='h1'
                        fontWeight='bold'
                        fontSize='2xl'
                        align='center'
                    >
                        Вітаю у програмі Розклад LPNU
                    </Text>
                    <Text
                        mt='4'
                        fontSize='large'
                        align='center'
                    >
                        Тут Ви зможете знайти розклад всіх груп нашого універу
                    </Text>
                    <ThemePicker />
                    <Flex justify='center' mt='4'>
                        <Stack direction='column' spacing={4}>
                            <Button
                                color='green.500'
                                textTransform='uppercase'
                                w={{ base: 'full', sm: 'auto' }}
                                onClick={onStart}
                            >
                                Почати
                            </Button>
                        </Stack>
                    </Flex>
                </Box>
            </Flex>
        </Container>
    );
}

export default Setup;
