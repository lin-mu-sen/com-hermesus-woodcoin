import {StyleSheet} from 'react-native';
import Fonts from 'utils/fonts';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container2: {
    position: 'absolute',
    top: '29%',
    left: '0%',
  },
  waves: {
    height: '70%',
    width: '150%',
    margin: 0,
    bottom: 0,
    position: 'absolute',
    zIndex: -5,
  },
  waves2: {
    height: '69%',
    width: '160%',
    margin: 0,
    bottom: 0,
    position: 'absolute',
    zIndex: -5,
  },
  logo: {
    // fontFamily: 'RobotoSlab-Light',
    fontFamily:Fonts.FSPRO,
    fontSize: 19,
    letterSpacing: 1,
    marginTop: 20,
  },
  topContainer: {
    flex: 3,
    width:"100%",
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomContainer: {
    flex: 2,
    justifyContent: 'flex-end',
    marginBottom: 40,
  },
  subtitle: {
    fontFamily: Fonts.regular,
    fontSize: 13,
  },
});
