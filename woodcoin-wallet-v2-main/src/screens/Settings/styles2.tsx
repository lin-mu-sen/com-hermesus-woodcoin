import {StyleSheet} from 'react-native';
import {Colors} from 'utils/colors';
import Fonts from 'utils/fonts';

export const styles2 = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollview: {
    flexGrow: 1,
    marginHorizontal: 15,
    paddingTop: 20,
  },
  paragraph: {
    textAlign: 'center',
    marginVertical: 20,
    marginHorizontal: 40,
    fontSize: 14,
    color: Colors.lighter,
  },
  unconfirmed: {
    marginBottom: 20,
    fontSize: 12,
    marginHorizontal: 10,
    marginTop: 5,
    color: Colors.lighter,
  },
  badge: {
    position: 'absolute',
    width: 8,
    height: 8,
    backgroundColor: 'red',
    zIndex: 10,
    borderRadius: 10,
    top: 20,
    left: 15,
  },
  textItem: {marginLeft: 10, color: Colors.black, flex: 3},
  title: {
    fontSize: 35,
    fontFamily: Fonts.Bold,
    color: Colors.black,
    marginTop: 0,
    marginLeft: 20,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: Fonts.Bold,
    color: Colors.lighter,
    marginVertical: 10,
  },
  item: {
    backgroundColor: Colors.card,
    padding: 20,
    borderRadius: 5,
    marginVertical: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemDelete: {
    backgroundColor: '#c7122a',
    padding: 10,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 30,
  },
  textDelete: {marginLeft: 10, color: 'white', flex: 3, fontWeight: 'bold'},
  mnemonicsContainer: {
    marginTop: 40,
    // backgroundColor: '#121212',
    padding: 15,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: Colors.black,
    borderStyle: 'dashed',
    minHeight: 130,
    marginHorizontal: 30,
    justifyContent: 'center',
  },
  mnemonics: {
    textAlign: 'center',
    lineHeight: 25,
    fontSize: 17,
    letterSpacing: 1,
    color: Colors.black,
    fontFamily: 'RobotoSlab-Regular',
  },
});
