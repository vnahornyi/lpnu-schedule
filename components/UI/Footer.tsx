import {
    Box,
    Container,
    Flex,
    IconButton,
    useColorModeValue
} from '@chakra-ui/react';

import { CalendarIcon, SettingsIcon } from '@chakra-ui/icons';
import { useRouter } from 'next/router';
import { SCHEDULE, SETTINGS } from 'constants/routes';

const Footer: React.FC = () => {
    const { pathname, push } = useRouter();

    const handlePushRoute = (route: string) => {
        return () => {
            push(route);
        }
    }

    return (
        <Container
            maxW='container.xl'
            w='full'
            pos='fixed'
            bottom='20px'
        >
            <Box
                p='4'
                rounded='2xl'
                bgColor={useColorModeValue('green.300', 'gray.700')}
            >
                <Flex alignItems='center' justify='space-evenly'>
                    <IconButton
                        aria-label='Розклад'
                        icon={<CalendarIcon />}
                        variant='ghost'
                        color='white'
                        isActive={pathname === SCHEDULE}
                        onClick={handlePushRoute(SCHEDULE)}
                    />
                    <IconButton
                        aria-label='Налаштування'
                        icon={<SettingsIcon />}
                        variant='ghost'
                        color='white'
                        isActive={pathname === SETTINGS}
                        onClick={handlePushRoute(SETTINGS)}

                    />
                </Flex>
            </Box>
        </Container>
    );
}

export default Footer;
