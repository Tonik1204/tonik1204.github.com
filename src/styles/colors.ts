const grey = (opacity: string) => `rgba(167, 173, 178, ${opacity})`;
const black = (opacity: string) => `rgba(46, 47, 58, ${opacity})`;
const white = (opacity: string) => `rgba(255, 255, 255, ${opacity})`;

const COLORS = {
  black: black('1'),
  black400: black('0.5'),
  black500: black('0.6'),
  black600: black('0.7'),
  black700: black('0.8'),
  black800: black('0.9'),
  black900: 'rgb(0, 0, 0)',
  blue: 'rgb(0, 123, 244)',
  blue10: 'rgb(246,248,251)',
  blue50: 'rgb(141, 195, 201)',
  blue100: 'rgb(0, 188, 212)',
  blue400: 'rgb(6, 126, 178)',
  blue500: 'rgb(46, 109, 111)',
  blue600: 'rgb(63, 81, 181)',
  lightBlue500: 'rgb(96, 169, 244)',
  green10: 'rgb(237, 247, 238)',
  green50: 'rgb(219, 242, 220)',
  green100: 'rgb(201, 236, 203)',
  green200: 'rgb(165, 223, 168)',
  green300: 'rgb(128, 210, 133)',
  green400: 'rgb(99, 209, 105)',
  green500: 'rgb(83, 198, 88)',
  green700: 'rgb(74, 192, 79)',
  grey10: 'rgba(250, 251, 251, 0.5)',
  grey50: grey('0.1'),
  grey100: grey('0.2'),
  grey150: grey('0.25'),
  grey200: grey('0.3'),
  grey300: grey('0.4'),
  grey400: grey('0.5'),
  grey500: grey('0.6'),
  grey600: grey('0.7'),
  grey700: grey('0.8'),
  grey800: grey('0.9'),
  grey900: grey('1'),
  orange100: 'rgba(255, 152, 0, .2)',
  orange500: 'rgb(255, 152, 0)',
  red100: 'rgb(253, 236, 234)',
  red300: 'rgb(247, 91, 72)',
  red500: 'rgb(244, 67, 54)',
  red700: 'rgb(229, 56, 45)',
  yellow: 'rgba(255, 202, 40, 1)',
  purpure: 'rgb(156, 39, 176)',
  purpure900: 'rgb(63, 46, 72)',
  white: white('1'),
  white0: white('0'),
  white800: white('0.8'),
  white900: white('0.9'),
};

const colors = {
  ...COLORS,
  text: COLORS.black,
};

const responses = {
  alert: colors.red500,
  success: colors.green500,
  warn: colors.orange500,
};

export default {
  ...colors,
  ...responses,
};
