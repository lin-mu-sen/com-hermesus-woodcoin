import {Appearance} from 'react-native';
const colorScheme = Appearance.getColorScheme();

let theme = {
  black: '#353333',
  foreground: '#27424F', //4d3e36
  background: '#FFFFFF',
  yellow: '#353333',
  inverse: 'white',
  darker: '#f5efe4',
  lighter: '#27424F',
  chart: 'rgba(53, 51, 51, 1)',
  card: 'white',
  brick: '#EDE2C1',
  border: '#f5efe4',
  brickEnd: '#353333',
  wave: '#F9F7F1',
  pill: '#ded464',

  switchBackground: '#353333',
  switchForeground: '#F9F7F1',
  inputBackground: 'white',
  inputForeground: '#353333',
  switchBackground2: '#F9F7F1',
  switchForeground2: '#353333',
  stats: '#fff',
  door: '#262424',
  kopernik:"#48C57D",
  waveborder: '#c4bba7',
  splash: '#fff',
};
if (colorScheme === 'dark') {
  theme = {
    black: '#353333',
    kopernik:"#48C57D",
    foreground: '#27424F', //4d3e36
    background: '#FFFFFF',
    yellow: '#353333',
    inverse: 'white',
    darker: '#f5efe4',
    lighter: '#27424F',
    chart: 'rgba(53, 51, 51, 1)',
    card: 'white',
    brick: '#EDE2C1',
    border: '#f5efe4',
    brickEnd: '#353333',
    wave: '#F9F7F1',
    pill: '#ded464',
    switchBackground: '#353333',
    switchForeground: '#F9F7F1',
    inputBackground: 'white',
    inputForeground: '#353333',
    switchBackground2: '#F9F7F1',
    switchForeground2: '#353333',
    stats: '#fff',
    door: '#262424',
    waveborder: '#c4bba7',
    splash: '#fff',
  };
}

export const Colors = theme;
