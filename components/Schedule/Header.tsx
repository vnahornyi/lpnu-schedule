import {
    Box,
    Button,
    Container,
    Flex,
    Text,
    useColorModeValue,
    useBreakpointValue
} from '@chakra-ui/react';

import { SettingsIcon } from '@chakra-ui/icons';
import { useRouter } from 'next/router';
import { SETTINGS } from 'constants/routes';

const Header: React.FC = () => {
    const router = useRouter();
    const isTabletWidth = useBreakpointValue({ base: true, lg: false });

    const handleSettings = () => {
        router.push(SETTINGS);
    }

    return (
        <Box
            w='full'
            bgColor={useColorModeValue('green.300', 'gray.800')}
            backdropBlur={{ base: 'md', md: 'none' }}
            pos='fixed'
            top='0'
            zIndex={999}
        >
            <Container maxW='container.xl' p='4'>
                <Flex justify={{ base: 'center', lg: 'space-between' }} align='center'>
                    <Text
                        as='h1'
                        fontSize={{ base: 'xl', lg: '3xl' }}
                        fontWeight='bold'
                        align={{ base: 'center', lg: 'left' }}
                        color='white'
                        cursor='default'
                        userSelect='none'
                    >
                        Розклад
                    </Text>
                    {!isTabletWidth && (
                        <Button
                            leftIcon={<SettingsIcon />}
                            onClick={handleSettings}
                            color='white'
                            variant='link'
                        >
                            Налаштування
                        </Button>
                    )}
                </Flex>
            </Container>
        </Box>
    );
}

export default Header;
