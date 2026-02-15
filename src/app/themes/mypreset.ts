import {definePreset} from '@primeuix/themes';
import Lara from '@primeuix/themes/lara';

const MyPreset = definePreset(Lara, {
  semantic: {
    primary: {
      50: '#fffbeb', 100: '#fef3c7', 200: '#fde68a', 300: '#fcd34d', 400: '#fbbf24',
      500: '#ffd000', 600: '#d97706', 700: '#b45309', 800: '#92400e', 900: '#78350f', 950: '#451a03'
    },
    secondary: {
      50: '#f0f9ff', 100: '#e0f2fe', 200: '#bae6fd', 300: '#7dd3fc', 400: '#38bdf8',
      500: '#38baea', 600: '#0284c7', 700: '#0369a1', 800: '#075985', 900: '#0c4a6e', 950: '#082f49'
    },
    colorScheme: {
      light: {
        primary: {
          color: '{primary.500}',
          contrastColor: '#000000',
          hoverColor: '{primary.600}',
          activeColor: '{primary.700}'
        },
        secondary: {
          color: '{sky.500}',
          contrastColor: '#ffffff',
          hoverColor: '{sky.600}',
          activeColor: '{sky.700}'
        }
      },
      dark: {
        primary: {
          color: '{primary.400}',
          contrastColor: '#000000',
          hoverColor: '{primary.300}',
          activeColor: '{primary.200}'
        }
      }
    }
  },
  components: {
    button: {
      colorScheme: {
        light: {
          root: {
            label: {
              fontWeight: 'bold'
            },
            secondary: {
              background: '{secondary.500}',
              hoverBackground: '{secondary.600}',
              borderColor: '{secondary.500}',
              hoverBorderColor: '{secondary.600}',
              color: '#ffffff'
            },
            primary: {
              background: '{primary.500}',
              hoverBackground: '{primary.400}',
              borderColor: '{primary.500}',
              hoverBorderColor: '{primary.400}',
              color: '#000000'
            }
          },
          text: {
            secondary: {
              color: '{secondary.500}'
            },
            primary: {
              color: '{primary.500}'
            }
          }
        }
      }
    },
    inputtext: {
      root: {
        focusBorderColor: '{primary.500}'
      }
    },
    select: {
      option: {
        focusBackground: '{primary.200}',
        selectedBackground: '{primary.100}',
        selectedColor: '{primary.700}'
      }
    }
  }
});
;

export default MyPreset;
