import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { MdBrightnessAuto } from 'react-icons/md';

import {
    Flex,
    ButtonGroup,
    IconButton,
    useColorMode
} from '@chakra-ui/react';

enum ColorModes {
    SYSTEM = 'system',
    LIGHT = 'light',
    DARK = 'dark'
}

const ThemePicker: React.FC = () => {
    const { setColorMode } = useColorMode();

    return (
        <Flex py='4' justify='center'>
            <ButtonGroup size='lg' isAttached variant='outline'>
                <IconButton
                    aria-label='Змінити на світлу тему'
                    icon={<SunIcon w='20px' h='20px' />}
                    onClick={setColorMode.bind(null, ColorModes.LIGHT)}
                />
                <IconButton
                    aria-label='Змінити на темну тему'
                    icon={<MoonIcon w='20px' h='20px' />}
                    onClick={setColorMode.bind(null, ColorModes.DARK)}
                />
                <IconButton
                    aria-label='Системна'
                    onClick={setColorMode.bind(null, ColorModes.SYSTEM)}
                    icon={<MdBrightnessAuto size={22} />}
                />
            </ButtonGroup>
        </Flex>
    );
}

export default ThemePicker;
