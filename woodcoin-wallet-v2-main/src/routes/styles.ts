import {CardStyleInterpolators} from '@react-navigation/stack';
import {Colors} from 'utils/colors';
import Fonts from "../utils/fonts"

const styles: any = {};

styles.noAnim = {
  headerShown: false,
  cardStyleInterpolator: CardStyleInterpolators.forNoAnimation,
};

styles.importWallet = {
  headerShown: false,
  title: 'Back',
  headerStyle: {
    shadowColor: 'transparent', // ios
    elevation: 0, // android
    backgroundColor: '#fff',
  },
  headerTintColor: Colors.black,
  headerBackTitleVisible: false,
  headerBackTitleStyle: {
    fontFamily: Fonts.regular,
  },
  headerTitleStyle: {
    fontWeight: 'bold',

    fontFamily: Fonts.regular,
    fontSize: 19,
    justifyContent: 'center',
  },
};

styles.walletscreen = {
  headerShown: true,
  headerTitle: '',
  headerStyle: {
    backgroundColor: '#fff',
    shadowColor: 'transparent', // ios
    elevation: 0, // android
  },
  headerTintColor: Colors.black,
  headerBackTitleVisible: false,
  headerBackTitleStyle: {
    fontFamily: Fonts.regular,
  },
  headerTitleStyle: {
    fontWeight: 'bold',
    fontFamily: Fonts.regular,
    fontSize: 19,
    justifyContent: 'center',
  },
};

export default styles;
