import * as React from 'react';
const bip39 = require('bip39');
import {useTranslation} from 'react-i18next';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  DeviceEventEmitter,
} from 'react-native';
import {useNavigation, CommonActions} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Clipboard from '@react-native-clipboard/clipboard';
import {SmallButton} from 'components/smallButton';
import {BigButton} from 'components/bigButton';
import {WalletStore} from 'stores/wallet';
import {sleep} from 'utils';
import {Colors} from 'utils/colors';
import {COIN_LIST} from 'utils/constants';
import {showMessage} from 'react-native-flash-message';
import {SettingsStore} from 'stores/settings';
import Fonts from 'utils/fonts';

export default function ImportWalletScreen({}) {
  const {t} = useTranslation();
  const navigation = useNavigation();
  const [copiedText, setCopiedText] = React.useState('');
  const [isDisabled, setIsDisabled] = React.useState(true);
  const fetchCopiedText = async () => {
    const text = await Clipboard.getString();
    setCopiedText(text);
    setIsDisabled(false);
  };
  const importNewWallet = async () => {
    try {
      const validMneonic = bip39.validateMnemonic(copiedText);
      if (!validMneonic) {
        // alert('Invalid Mnemonic');
        showMessage({
          message: t('message.error.mnemonic_invalid'),
          type: 'danger',
        });
        return;
      }
      DeviceEventEmitter.emit('showDoor', {
        title: t('modal.please_wait'),
      });
      await sleep(500);
      const importAcc = await WalletStore.createWallets(copiedText, COIN_LIST);
      if (importAcc) {
        SettingsStore.setMnemonicBackupDone(true);
        navigation.dispatch(
          CommonActions.reset({
            index: 1,
            routes: [{name: 'HomeScreens'}],
          }),
        );
      } else {
        showMessage({
          message: t('message.error.unable_to_import_wallets'),
          type: 'danger',
        });
        // alert('err');
      }
    } catch (error) {
      // alert('KO');
      showMessage({
        message: t('message.error.unable_to_import_wallets'),
        type: 'danger',
      });
    }
  };
  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}>
      <SafeAreaView style={{flex: 1}}>
        <View style={styles.topContainer}>
          <Text style={styles.subtitle}>{t('setup.import_phrase')}</Text>
          <Text style={styles.paragraph}>
            {t('setup.paste_recovery_phrase')}
          </Text>
          <View style={styles.mnemonicsContainer}>
            <Text selectable style={styles.mnemonics}>
              {copiedText}
            </Text>
          </View>
          <SmallButton
            text={t('setup.paste')}
            onPress={fetchCopiedText}
            style={{backgroundColor: '#27424F', marginTop: 30}}
            color="#fff"
          />
        </View>
        <View style={styles.bottomContainer}>
          <Text style={styles.paragraphBottom}>{t('setup.copy_in_order')}</Text>
          <BigButton
            text={t('setup.import_wallet')}
            backgroundColor="#48C57D"
            color="#fff"
            disabled={isDisabled}
            onPress={() => importNewWallet()}
          />
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    paddingTop: 30,
    paddingHorizontal: 20,
    flexGrow: 1,
  },
  topContainer: {
    flex: 2,
  },
  bottomContainer: {
    flex: 1,
    marginTop: 20,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 30,
  },
  mnemonicsContainer: {
    marginTop: 40,
    padding: 15,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: Colors.black,
    borderStyle: 'dashed',
    minHeight: 130,
    justifyContent: 'center',
  },
  mnemonics: {
    textAlign: 'center',
    lineHeight: 25,
    fontSize: 19,
    letterSpacing: 1,
    color: Colors.black,
    fontFamily: Fonts.regular,
  },
  subtitle: {
    marginBottom: 10,
    fontSize: 26,
    textAlign: 'center',
    fontFamily: Fonts.Bold,
    color: Colors.black,
  },
  paragraph: {
    margin: 10,
    fontSize: 18,
    textAlign: 'center',
    fontFamily: Fonts.Light,
    color: Colors.lighter,
  },
  paragraphBottom: {
    marginBottom: 20,
    fontSize: 16,
    width: '100%',
    textAlign: 'center',
    alignSelf: 'center',
    fontFamily: Fonts.Light,
    color: Colors.lighter,
  },
});
