import {StyleSheet} from 'react-native';
import {Colors} from 'utils/colors';
import Fonts from 'utils/fonts';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:Colors.darkgreen
  },
  pager: {
    flex: 5,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  pagerView: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  footer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  desc: {
    fontSize: 20,
    textAlign: 'center',
    marginHorizontal: 30,
    fontFamily: Fonts.regular,
    color: Colors.black,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 32,
    borderRadius: 20,
    elevation: 3,
    backgroundColor: Colors.kopernik,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: Colors.background,
  },
});
