import {StyleSheet} from 'react-native';
import {Colors} from 'utils/colors';
import Fonts from 'utils/fonts';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#1A1919',
    borderRadius: 100,
    padding: 15,
  },
  topContainer: {
    flex: 3,
    justifyContent: 'flex-start',
    marginTop: 20,
  },
  badge: {
    position: 'absolute',
    width: 10,
    height: 10,
    backgroundColor: 'red',
    zIndex: 10,
    borderRadius: 10,
  },
  bottomContainer: {
    flex: 1,
  },
  subContainer: {
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
  },
  icons: {marginTop: 15, marginLeft: 25},
  subtitle: {
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: Fonts.regular,
    color: '#27424F',
    marginLeft: 10,
    marginBottom: 5,
    marginTop: 20,
  },
  item2: {
    backgroundColor: Colors.darker,
    padding: 20,
    borderRadius: 5,
    marginVertical: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoText: {
    fontSize: 34,
    color: Colors.lighter,
    marginLeft: 10,
  },
  vLine: {
    width: 1,
    height: 25,
    backgroundColor: Colors.lighter,
    marginHorizontal: 20,
  },
  infoCard: {
    backgroundColor: Colors.darker,
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
    marginHorizontal: 15,
    borderRadius: 10,
    marginTop: 5,
  },
  infoContainer: {
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    alignSelf: 'center',
    maxWidth: '40%',
  },
  balance: {
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: Fonts.regular,
    textAlign: 'center',
    color: '#27424F',
  },
  coinValue: {
    fontSize: 70,
    fontFamily: Fonts.Bold,
    textAlign: 'center',
    color: '#27424F',
    maxWidth: '80%',
  },
  fiatValue: {
    fontSize: 40,
    fontFamily: Fonts.Bold,
    textAlign: 'center',
    color: '#27424F',
    marginTop: 10,
    marginHorizontal: 30,
  },
  btnImg: {
    width: 40,
    height: 40,
  },
  moreImg: {
    width: 17,
    height: 17,
  },
  moreBtn: {
    paddingHorizontal: 5,
    justifyContent: 'space-around',
    paddingRight: 15,
  },
});
