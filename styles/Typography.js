import Colors from './Colors';

const typography = {
  h1: {fontSize: 32, lineHeight: 40, fontFamily: 'Roboto-Bold'},
  h2: {fontSize: 24, lineHeight: 32, fontFamily: 'Roboto-Bold'},
  h3: {fontSize: 20, lineHeight: 28, fontFamily: 'Roboto-Medium'},
  title: {
    fontFamily: 'Bebas Neue',
    color: Colors.lightGrey,
    opacity: 0.8,
    fontSize: 20,
  },
  label: {
    fontFamily: 'Asap',
    color: Colors.white,
    fontSize: 16,
    // fontWeight: '500',
  },
  body: {fontSize: 16, lineHeight: 24, fontFamily: 'Roboto-Regular'},
  caption: {fontSize: 14, lineHeight: 20, fontFamily: 'Roboto-Light'},
};

export default typography;
