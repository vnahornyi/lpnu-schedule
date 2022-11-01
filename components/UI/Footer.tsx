import {
    Box,
    Flex,
    IconButton,
    useColorModeValue
} from '@chakra-ui/react';

import { SettingsIcon } from '@chakra-ui/icons';
import { HiClock } from 'react-icons/hi';
import { useRouter } from 'next/router';
import { SCHEDULE, SETTINGS } from 'constants/routes';
import { useAppSelector } from 'hooks/useStore';
import { translit } from 'utils';

const Footer: React.FC = () => {
    const { selectedGroup, subGroup } = useAppSelector(state => state.settings);
    const { pathname, push } = useRouter();

    const handleRouteToSchedule = () => {
        push(`/schedule/${translit(selectedGroup ?? '')}_${subGroup}`.toLowerCase());
    }

    const handleRouteToSettings = () => {
        push(SETTINGS);
    }

    return (
        <Box
            bgColor={useColorModeValue('white', 'gray.700')}
            as='footer'
            py='4'
            px='16'
            pb='30px'
            w='full'
            pos='fixed'
            bottom='0'
            boxShadow='2xl'
        >
            <Flex alignItems='center' justify='space-between'>
                <IconButton
                    aria-label='Розклад'
                    icon={<HiClock size={25} />}
                    variant='ghost'
                    color={useColorModeValue('gray.400', 'white')}
                    isActive={pathname === SCHEDULE}
                    onClick={handleRouteToSchedule}
                    sx={{
                        _active: {
                            bg: 'transparent',
                            color: 'green.300'
                        }
                    }}
                />
                <IconButton
                    aria-label='Налаштування'
                    icon={<SettingsIcon w='20px' h='20px' />}
                    variant='ghost'
                    color={useColorModeValue('gray.400', 'white')}
                    isActive={pathname === SETTINGS}
                    onClick={handleRouteToSettings}
                    sx={{
                        _active: {
                            bg: 'transparent',
                            color: 'green.300'
                        }
                    }}
                />
            </Flex>
        </Box>
    );
}

export default Footer;
