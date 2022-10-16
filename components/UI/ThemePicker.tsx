import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { Flex, ButtonGroup, IconButton, Button, useColorMode } from '@chakra-ui/react';

enum ColorModes {
    SYSTEM = 'system',
    LIGHT = 'light',
    DARK = 'dark'
}

const ThemePicker: React.FC = () => {
    const { setColorMode } = useColorMode();

    return (
        <Flex py='4' justify='center'>
            <ButtonGroup size='sm' isAttached variant='outline'>
                <IconButton
                    aria-label='Змінити на світлу тему'
                    color='white'
                    icon={<SunIcon />}
                    onClick={setColorMode.bind(null, ColorModes.LIGHT)}
                />
                <IconButton
                    aria-label='Змінити на темну тему'
                    color='white'
                    icon={<MoonIcon />}
                    onClick={setColorMode.bind(null, ColorModes.DARK)}
                />
                <Button onClick={setColorMode.bind(null, ColorModes.SYSTEM)} color='white'>
                    Авто вибір теми
                </Button>
            </ButtonGroup>
        </Flex>
    );
}

export default ThemePicker;
