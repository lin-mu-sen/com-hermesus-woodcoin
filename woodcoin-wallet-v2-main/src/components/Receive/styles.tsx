import {StyleSheet} from 'react-native';
import {Colors} from 'utils/colors';
import Fonts from 'utils/fonts';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 10,
    marginHorizontal: 10,
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 0,
  },
  networkTxt: {fontSize: 11, color: Colors.lighter, fontWeight: 'bold'},
  network: {
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 45,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  qrcontainer: {flex: 1, justifyContent: 'center', marginTop: 50},
  qr: {
    height: 220,
    width: 220,
    borderColor: 'black',
    borderWidth: 0,
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: 'white',
  },
  share: {flex: 1, justifyContent: 'flex-end', marginBottom: 40},
  address: {
    fontSize: 15,
    fontWeight: 'bold',
    fontFamily: Fonts.regular,
    marginBottom: 10,
    width: 230,
    textAlign: 'center',
    marginTop: 20,
    color: Colors.light,
  },
});
