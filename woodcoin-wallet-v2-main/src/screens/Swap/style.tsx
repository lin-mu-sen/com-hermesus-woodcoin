import {StyleSheet, Dimensions, Platform} from 'react-native';
import {Colors} from 'utils/colors';
import {SIZE} from 'utils/constants';
import Fonts from 'utils/fonts';

const windowWidth = Dimensions.get('window').width;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  swapContainer: {
    marginTop: 10,
  },
  swapItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: Colors.card,
    height: 74,
    marginVertical: 2,
    padding: 20,
    marginHorizontal: 15,
    borderRadius: 10,
    borderColor: Colors.border,
    borderWidth: 1,
  },
  details: {
    flexDirection: 'column',
    height: 200,
    padding: 20,
    borderRadius: 10,
  },
  detailItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 40,
    alignItems: 'center',
    borderBottomColor: Colors.border,
    borderBottomWidth: 1,
    paddingBottom: 5,
    paddingTop: 5,
  },
  swapApproveContainer: {
    height: SIZE.height / 2,
    backgroundColor: Colors.card,
    paddingHorizontal: 15,
  },
  connector: {
    width: 36,
    height: 36,
    position: 'absolute',
    backgroundColor: Colors.brick,
    borderRadius: 100,
    top: 60,
    left: windowWidth / 2 - 18,
    zIndex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  youPay: {
    color: Colors.lighter,
    fontSize: 13,
  },
  balance: {
    color: Colors.lighter,
    fontSize: 12,
    marginLeft: 20,
    marginBottom: 10,
    marginTop: 5,
  },
  amount: {
    color: Colors.black,
    fontSize: 18,
    marginTop: Platform.OS == 'android' ? 0 : 5,
    paddingRight: 10,
    height: Platform.OS == 'android' ? 40 : 20,
    // backgroundColor: 'red',
    // flex: 1,
  },
  coinText: {
    color: Colors.black,
    fontSize: 14,
    flex: 1,
  },
  coin: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    // height: 30,
    // width: 100,
    justifyContent: 'flex-start',
  },
  tinyLogo: {
    width: 28,
    height: 28,
    padding: 10,
    marginRight: 10,
    borderRadius: 100,
    backgroundColor: 'white',
  },
  coinsSheet: {
    flex: 1,
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 2,
    backgroundColor: Colors.background,
  },
  close: {
    position: 'absolute',
    width: 36,
    height: 36,
    left: 10,
    zIndex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    color: Colors.black,
  },
  slippage: {
    position: 'absolute',
    width: 36,
    height: 36,
    right: 15,
    zIndex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    color: Colors.black,
  },
  modalTitle: {
    color: Colors.black,
    fontSize: 19,
    alignSelf: 'center',
    textAlign: 'center',
    marginTop: 15,
    fontFamily: Fonts.Bold,
  },
  modalBody: {
    textAlign: 'center',
    color: Colors.black,
    fontSize: 15,
    margin: 5,
  },
  listItem: {
    flexDirection: 'row',
    flex: 1,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.brick,
    paddingVertical: 10,
    alignItems: 'center',
  },
  listImg: {
    width: 20,
    height: 20,
    marginRight: 0,
    justifyContent: 'center',
    alignSelf: 'center',
    marginVertical: 10,
  },
  listContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  listName: {
    flex: 2,
    color: Colors.black,
    marginLeft: 10,
    fontSize: 17,
  },
  listBalance: {
    flex: 1,
    color: Colors.lighter,
    marginLeft: 10,
    fontSize: 13,
    textAlign: 'right',
  },
  list: {
    paddingVertical: 10,
    height: 60,
    justifyContent: 'center',
  },
  listTitle: {
    fontWeight: '400',
    letterSpacing: 1,
    fontFamily: Fonts.regular,
    fontSize: 20,
    justifyContent: 'center',
    textAlign: 'center',
    color: Colors.black,
  },
  listFooter: {
    textAlign: 'center',
    fontSize: 13,
    paddingTop: 25,
    color: Colors.lighter,
    width: 230,
    alignSelf: 'center',
    paddingBottom: 50,
  },
  header: {
    height: 60,
    marginTop:20,
    justifyContent: 'center',
  },
  title: {
    fontWeight: '400',
    letterSpacing: 1,
    fontFamily: Fonts.regular,
    fontSize: 20,
    justifyContent: 'center',
    textAlign: 'center',
    color: Colors.black,
  },
  segment: {
    marginHorizontal: 15,
    height: 35,
    backgroundColor: Colors.darker,
  },
});
