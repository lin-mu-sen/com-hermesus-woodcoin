import {StyleSheet} from 'react-native';
import Fonts from 'utils/fonts';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    height: '100%',
    width: '100%',
  },
  container2: {
    position: 'absolute',
    top: '40%',
    left: '40%',
  },
  waves: {
    height: '100%',
    width: '150%',
    margin: 0,
    bottom: 0,
    position: 'absolute',
    zIndex: -5,
  },
  waves2: {
    height: '98%',
    width: '160%',
    margin: 0,
    bottom: 0,
    position: 'absolute',
    zIndex: -5,
  },
  animContainer: {
    height: '100%',
    marginTop: -60,
  },
  title: {
    color: '#fff',
    fontSize: 19,
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: 20,
  },
  body: {
    color: '#fff',
    fontSize: 15,
    textAlign: 'center',
    marginTop: 20,
    lineHeight: 20,
  },
  animview: {
    width: '100%',
    height: '110%',
    position: 'absolute',
    bottom: -80,
    transform: [{scaleX: 1}],
  },
  animbody: {
    flex: 1,
    justifyContent: 'flex-end',
    alignSelf: 'center',
    marginBottom: 150,
    marginHorizontal: 40,
  },
  logo: {
    height: 70,
    width: 70,
    tintColor: '#48C57D',
    zIndex: 100,
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 200,
    opacity: 0.8,
  },
  topContainer: {
    flex: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomContainer: {
    flex: 2,
    justifyContent: 'flex-end',
    marginBottom: 30,
  },
  subtitle: {
    fontFamily: Fonts.regular,
    fontSize: 13,
  },
});
