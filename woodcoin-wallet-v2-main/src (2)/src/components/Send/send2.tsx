import React, {useState, createRef, useEffect} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Alert,
  Keyboard,
  Linking,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';
import {useTranslation} from 'react-i18next';
import {BigButton} from 'components/bigButton';
import {InAppBrowser} from 'react-native-inappbrowser-reborn';
import ActionSheet from 'react-native-actions-sheet';
import {showMessage} from 'react-native-flash-message';
import {formatNoComma, formatPrice, sleep} from 'utils';
import Clipboard from '@react-native-clipboard/clipboard';
import {WalletStore} from 'stores/wallet';
import {SmallButton} from '../smallButton';
import {Colors} from 'utils/colors';
import {LoadingModal} from 'services/loading';
import {WalletFactory} from '@coingrig/core';
import {CryptoService} from 'services/crypto';
import {styles} from './styles';
import {Logs} from 'services/logs';
import CONFIG from 'config.sample';

const actionSheetRef: React.RefObject<any> = createRef();
const actionCamera: React.RefObject<any> = createRef();

/**
 * SendContainer component it is part of the SendReceive Screen
 * and it's used for sending a transaction
 * @param props CoinDescriptor, coin, chain, address
 * @returns
 */
export function SendContainerWood(props: any) {
  const {t} = useTranslation();
  const navigation = useNavigation();
  const [destination, setDestination] = useState<string>('');
  const [value, setValue] = useState('');
  const [wallet, setWallet] = useState<any>();
  const [fees, setFees] = useState<any>();
  const [feeFiat, setFeeFiat] = useState<any>(0);
  const [toFiat, setToFiat] = useState<any>(0);
  const [keyboardEnabled, setKeyboardEnabled] = useState(false);

  useEffect(() => {
    setupWallet();
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardEnabled(true);
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardEnabled(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * Prepare/Setup wallet for transaction
   */
  const setupWallet = async () => {
    let chainKeys = await CryptoService.getChainPrivateKeys();
    let descriptor = Object.assign({}, props.coinDescriptor, {
      privKey: chainKeys[props.coinDescriptor.chain],
      walletAddress: WalletStore.getWalletAddressByChain(
        props.coinDescriptor.chain,
      ),
    });
    const _wallet = WalletFactory.getWallet(descriptor);
    setWallet(_wallet);
  };

  /**
   * Get address from clipboard and paste it to the destination input
   */
  const fetchCopiedText = async () => {
    const text = await Clipboard.getString();
    setDestination(text);
  };

  const onSuccess = e => {
    setDestination(e.data);
    actionCamera.current?.setModalVisible(false);
  };

  /**
   * Preapare transacation and calculate fees
   */
  const prepareTx = async () => {
    Keyboard.dismiss();
    if (!value || !destination) {
      Alert.alert('Error', 'Please fill up the form');
      return;
    }
    const amountToSend = formatNoComma(value.toString());
    // console.log(amountToSend);
    // console.log();
    // setValue(WalletStore.getWalletByCoinId("LOG", "LOG")?.price ? (Number(WalletStore.getWalletByCoinId("LOG", "LOG")?.price)*Number(amountToSend))?.toString() : amountToSend.toString());
    setValue(amountToSend);
    await sleep(500);

    LoadingModal.instance.current?.show();
    await sleep(200);
    try {
      // const _fees = await wallet.getTxSendProposals(destination, amountToSend);
      // if (!_fees || Object.keys(_fees).length === 0) {
      //   showMessage({
      //     message: t('message.error.amount_to_send_too_large_or_small'),
      //     type: 'danger',
      //   });
      //   LoadingModal.instance.current?.hide();
      //   return;
      // }
      // const chainNativeAsset = CryptoService.getChainNativeAsset(props.chain);
      // let fFiat =
      //   _fees.regular.getFeeValue() *
      //   WalletStore.getWalletByCoinId(chainNativeAsset, props.chain)?.price!;
      setToFiat((WalletStore.getWalletByCoinId("LOG", "LOG")?.price ? Number(WalletStore.getWalletByCoinId("LOG", "LOG")?.price)*(Number(amountToSend)+0.0005) : (0.0005+Number(amountToSend))));
      setFeeFiat(0.0005);
      LoadingModal.instance.current?.hide();
      await sleep(300);
      actionSheetRef.current?.setModalVisible();
    } catch (error) {
      console.log(error);
      LoadingModal.instance.current?.hide();
      showMessage({
        message: t('message.error.remote_servers_not_available'),
        type: 'warning',
      });
    }
  };

  /**
   * Get and format the input amount
   * @param v Input amount
   */
  const setAmount = v => {
    setValue(v);
    const formattedValue = formatNoComma(v);
    const fiatValue = !formattedValue
      ? 0
      : (WalletStore.getWalletByCoinId("LOG", "LOG")?.price ? Number(WalletStore.getWalletByCoinId("LOG", "LOG")?.price)*(Number(formattedValue)+0.0005) : (0.0005+Number(formattedValue)));
    setToFiat(fiatValue);
  };

  const openLink = async url => {
    try {
      if (await InAppBrowser.isAvailable()) {
        await InAppBrowser.open(url, {
          dismissButtonStyle: 'cancel',
          readerMode: false,
          animated: true,
          modalPresentationStyle: 'automatic',
          modalTransitionStyle: 'coverVertical',
          modalEnabled: true,
          enableBarCollapsing: false,
          showTitle: true,
          enableUrlBarHiding: true,
          enableDefaultShare: true,
          forceCloseOnRedirection: false,
        });
      } else {
        Linking.openURL(url);
      }
    } catch (error) {
      Logs.error(error);
    }
  };

  /**
   * Execute/Send the transaction
   */
  const executeTX = async () => {
    actionSheetRef.current?.setModalVisible(false);
    await sleep(200);
    LoadingModal.instance.current?.show();
    await sleep(200);
    try {
      var myHeaders = new Headers();
myHeaders.append("address", WalletStore.getWalletByCoinId("LOG", "LOG")?.walletAddress || "Wd4vRJJy5V7Mx5joAXtnY3aBfmGFSNpsfN");
myHeaders.append("towhom", destination);
myHeaders.append("amount", value);

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  redirect: 'follow'
};

fetch(CONFIG.API+"/api/sendfromtoa", requestOptions)
  .then(response => response.json())
  .then(result => {
    if(result && result?.payload){
      showMessage({
        message: t('message.transaction_done'),
        type: 'success',
        duration: 5000,
        onPress: () => {
          openLink(CryptoService.getTxExplorer("LOG", result?.payload));
        },
      });
    } else {
      showMessage({
        message: t('message.error.transaction_can_not_be_executed'),
        type: 'warning',
      });
    }
  })
  .catch(error => console.log('error', error));
      // let tx = await wallet.postTxSend(fees.regular);
      
      LoadingModal.instance.current?.hide();
      navigation.goBack();
    } catch (error) {
      Logs.error(error);
      showMessage({
        message: t('message.error.transaction_can_not_be_executed'),
        type: 'danger',
      });
    }
  };

  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <View style={[styles.maincontainer, {flex: keyboardEnabled ? 0 : 1}]}>
      <View style={styles.container}>
        <View>
          <View style={styles.inputView}>
            <TextInput
              style={styles.input}
              onChangeText={v => setDestination(v)}
              value={destination}
              placeholder={t('tx.destination_address')}
              numberOfLines={1}
              returnKeyType="done"
              placeholderTextColor="gray"
              autoCompleteType={'off'}
              autoCapitalize={'none'}
              autoCorrect={false}
            />
            {/*  <TouchableOpacity
              onPress={() => fetchCopiedText()}
              style={styles.moreBtn}>
              <Icon name="content-paste" size={20} color={Colors.foreground} />
            </TouchableOpacity> */}
            <TouchableOpacity
              onPress={() => actionCamera.current?.setModalVisible()}
              style={styles.moreBtn2}>
              <Icon name="qr-code" size={21} color={Colors.foreground} />
            </TouchableOpacity>
          </View>

          <View style={styles.inputView}>
            <TextInput
              style={styles.input}
              onChangeText={v => setAmount(v)}
              value={value}
              placeholder={props.coin + ' ' + t('tx.amount')}
              keyboardType="numeric"
              numberOfLines={1}
              returnKeyType="done"
              placeholderTextColor="gray"
            />
            <View style={styles.moreBtn2}>
              <Text style={{color: Colors.foreground}}>{props.coin}</Text>
            </View>
          </View>
          <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
            <Text style={styles.toFiat}>
              {formatPrice(toFiat, true) || '$0'}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.preparetx}>
        <View
          style={{
            paddingVertical: 5,
            justifyContent: 'center',
            alignSelf: 'center',
            marginBottom: 5,
          }}>
          <Text
            style={{
              fontSize: 11,
              color: Colors.lighter,
              textAlign: 'center',
              fontWeight: 'bold',
            }}>
            {t('wallet.network') +
              ': ' +
              CryptoService.getSupportedChainNamebyID(props.chain)}
          </Text>
          <Text style={styles.available}>
            {t('tx.available')}: {props.coinDescriptor?.balance ?? 0}{' '}
            {props.coinDescriptor?.symbol ?? ''}
          </Text>
        </View>
        <BigButton
          text="Send"
          backgroundColor="#48C57D"
          color={Colors.background}
          disabled={false}
          onPress={() => prepareTx()}
        />
      </View>
      <ActionSheet
        //@ts-ignore
        ref={actionSheetRef}
        gestureEnabled={true}
        headerAlwaysVisible
        containerStyle={{flex: 1}}>
        <View>
          <Text style={styles.confirmtx}>{t('tx.confirm_tx')}</Text>
          <View style={styles.amountusd}>
            {/* <Text style={{marginBottom: 5}}>
              {t('tx.amount_in_usd')}: {formatPrice(toFiat, true) || '$0'}
            </Text> */}
            <Text>
              {t('tx.network_fee')}: {Number(feeFiat).toFixed(5)}
            </Text>
            <Text style={styles.totalusd}>
              {t('tx.total_usd')}: {formatPrice(toFiat)}
            </Text>
          </View>
        </View>
        <SmallButton
          text={t('tx.confirm')}
          onPress={() => executeTX()}
          style={styles.exectx}
          color="white"
        />
      </ActionSheet>
      <ActionSheet
        //@ts-ignore
        ref={actionCamera}
        gestureEnabled={true}
        headerAlwaysVisible
        containerStyle={styles.cameracontainer}>
        <QRCodeScanner
          onRead={onSuccess}
          //@ts-ignore
          cameraContainerStyle={{margin: 20}}
          flashMode={RNCamera.Constants.FlashMode.auto}
        />
      </ActionSheet>
    </View>
  );
}
