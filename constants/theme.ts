
import { extendTheme, type ThemeConfig } from '@chakra-ui/react';

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: true,
};

const theme = extendTheme({ config, styles: {
  global: {
    '@media (display-mode: standalone)': {
      '*': {
        userSelect: 'none',
        WebkitTapHighlightColor: 'transparent'
      }
    }
  }
} });

export default theme;
