import {
    Container,
    Flex,
    ScaleFade,
    Spinner,
    Stack,
    useBreakpointValue,
    useColorModeValue
} from '@chakra-ui/react';

import useBrowser from 'hooks/useBrowser';
import ChakraNextImage from './ChakraNextImage';

const Loading: React.FC = () => {
    const isBrowser = useBrowser();
    const logoSizes = useBreakpointValue({ base: 160, md: 220 });
    
    return (
        <Container maxW='full' minH='100vh' bg={useColorModeValue('green.300', 'gray.800')}>
            <Flex justify='center' align='center' minH='inherit'>
                <ScaleFade initialScale={0.3} in={isBrowser}>
                    <Stack direction='column' spacing={10}>
                        <ChakraNextImage
                            src='/assets/logo.png'
                            width={logoSizes}
                            height={logoSizes}
                            alt='logo'
                            mx='auto'
                            mb='4'
                            draggable={false}
                        />
                        <Flex justify='center'>
                            <Spinner size='xl' color='white' />
                        </Flex>
                    </Stack>
                </ScaleFade>
            </Flex>
        </Container>
    );
}

export default Loading;
