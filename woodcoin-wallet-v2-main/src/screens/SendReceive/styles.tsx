import {StyleSheet} from 'react-native';
import {Colors} from 'utils/colors';

export const styles = StyleSheet.create({
  loadingView: {
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    // backgroundColor:"#ccc",
    flex: 1,
  },
  segment: {
    backgroundColor:Colors.btnback,
    borderRadius:20,
    marginVertical:16,
    marginHorizontal: 15,
    height: 40,
    marginBottom: 10,
  },
});
