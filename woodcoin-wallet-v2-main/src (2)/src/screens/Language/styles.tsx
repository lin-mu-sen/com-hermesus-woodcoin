import {StyleSheet} from 'react-native';
import {Colors} from 'utils/colors';
import Fonts from 'utils/fonts';

export const styles = StyleSheet.create({
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
    color: Colors.foreground,
  },
  textItem: {marginLeft: 10, color: Colors.foreground, flex: 3},
  title: {
    fontSize: 35,
    fontFamily: Fonts.Bold,
    color: Colors.foreground,
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
    borderRadius: 15,
    marginVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 3.62,

    elevation: 4,
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
    borderColor: Colors.foreground,
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
    color: Colors.foreground,
    fontFamily: Fonts.regular,
  },
});
