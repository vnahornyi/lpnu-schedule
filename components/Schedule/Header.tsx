import {
    Box,
    Button,
    Container,
    Flex,
    Text,
    useColorModeValue,
    useBreakpointValue,
    Stack
} from '@chakra-ui/react';

import { SettingsIcon } from '@chakra-ui/icons';
import { useRouter } from 'next/router';
import { SETTINGS } from 'constants/routes';
import useDate from 'hooks/useDate';

const Header: React.FC = () => {
    const router = useRouter();
    const date = useDate({ type: 'full' });
    const isTabletWidth = useBreakpointValue({ base: true, lg: false });

    const handleSettings = () => {
        router.push(SETTINGS);
    }

    return (
        <Box
            w='full'
            bgColor={useColorModeValue('white', 'gray.800')}
        >
            <Container maxW='container.xl' p='4'>
                <Flex justify='space-between' align='center'>
                    <Stack direction='column' spacing='1'>
                        <Text
                            as='h2'
                            fontSize={{ base: 'md', lg: 'xl' }}
                            color={useColorModeValue('gray.500', 'white')}
                        >
                            {date}
                        </Text>
                        <Text
                            as='h1'
                            fontSize={{ base: 'xl', lg: '3xl' }}
                            fontWeight='bold'
                        >
                            Сьогодні
                        </Text>
                    </Stack>
                    {!isTabletWidth && (
                        <Button
                            leftIcon={<SettingsIcon />}
                            onClick={handleSettings}
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
