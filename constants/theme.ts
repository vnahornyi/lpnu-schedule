
import { extendTheme, type ThemeConfig } from '@chakra-ui/react';

const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: true,
};

const theme = extendTheme({ config, styles: {
  global: {
    '@media (display-mode: standalone)': {
      '*': {
        userSelect: 'none'
      }
    }
  }
} });

export default theme;
