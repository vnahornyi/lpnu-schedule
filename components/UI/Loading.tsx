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
import Head from 'next/head';
import ChakraNextImage from './ChakraNextImage';

const Loading: React.FC = () => {
    const isBrowser = useBrowser();
    const logoSizes = useBreakpointValue({ base: 160, md: 220 });
    const themeColor = useColorModeValue('#68D391', '#1A202C');
    
    return (
        <Container maxW='full' minH='100vh' bg={useColorModeValue('green.300', 'gray.800')}>
            <Head>
                <meta name="theme-color" content={themeColor} />
            </Head>
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
