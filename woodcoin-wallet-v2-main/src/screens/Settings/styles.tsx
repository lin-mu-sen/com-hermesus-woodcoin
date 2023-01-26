import {StyleSheet} from 'react-native';
import {Colors} from 'utils/colors';
import Fonts from 'utils/fonts';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:Colors.darkgreen,
    paddingTop:30
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
    color: Colors.light,
  },
  unconfirmed: {
    marginBottom: 20,
    fontSize: 12,
    marginHorizontal: 10,
    marginTop: 5,
    color: Colors.card,
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
  textItem: {marginLeft: 10, color: Colors.card, flex: 3},
  title: {
    fontSize: 35,
    fontFamily: Fonts.Bold,
    color: Colors.card,
    marginTop: 0,
    marginLeft: 20,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: Fonts.FSPRO,
    color: Colors.lighter,
    marginVertical: 10,
  },
  item: {
    backgroundColor: "#3E6069",
    padding: 30,
    borderRadius: 15,
    marginVertical: 4,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: 'rgba(0,0,0,0.18)',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 8,
  },
  itemDelete: {
    backgroundColor: '#D65555',
    padding: 20,
    borderRadius: 15,
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
    borderColor: Colors.light,
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
    color: Colors.light,
    fontFamily: 'RobotoSlab-Regular',
  },
});
