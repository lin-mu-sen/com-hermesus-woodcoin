import React, { useEffect, useState } from 'react';
import { View, ScrollView, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ReceiveContainer } from 'components/Receive';
import { SendContainer } from 'components/Send';
import { WalletStore } from 'stores/wallet';
import { useTransitionEnd } from 'utils/hooks/useTransitionEnd';
import { styles } from './styles';
import { Colors } from 'utils/colors';
import { Segment, SegmentedControl } from 'react-native-resegmented-control';
import { useTranslation } from 'react-i18next';
import { CryptoService } from 'services/crypto';

const SendReceiveScreen = ({ route }) => {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const [isReceive, setIsReceive] = useState(route.params.receive);
  const [address, setAddress] = useState('loading...');
  const [coinDescriptor, setCoinDescriptor] = useState({});
  const tEnded = useTransitionEnd(navigation);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: route.params.coin,
      headerStyle: {
        backgroundColor: Colors.darkgreen,
        shadowColor: 'transparent', // ios
        elevation: 0, // android
      },
      headerTintColor: '#fff',
    });
    const wallet = WalletStore.getWalletByCoinId(
      route.params.coin,
      route.params.chain,
    );
    setAddress(WalletStore.getWalletAddressByChain(wallet?.chain ?? '') ?? '');
    setCoinDescriptor(wallet ?? {});
    CryptoService.getAccountBalance();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loading = () => {
    return (
      <View style={styles.loadingView}>
        <ActivityIndicator color="#48C57D" size="large" />
      </View>
    );
  };
  const renderContainer = () => {
    if (isReceive) {
      return tEnded ? (
        <ReceiveContainer address={address} chain={route.params.chain} />
      ) : (
        loading()
      );
    } else {
      return tEnded ? (
        <SendContainer
          coin={route.params.coin}
          chain={route.params.chain}
          address={address}
          coinDescriptor={coinDescriptor}
        />
      ) : (
        loading()
      );
    }
  };

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      style={{
        backgroundColor: Colors.darkgreen
      }}
      scrollEnabled={false}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled">
      <SegmentedControl
        inactiveTintColor={"#fdfcfc"}
        activeTintColor={"#000"}
        initialSelectedName={isReceive ? 'receive' : 'send'}
        style={styles.segment}
        onChangeValue={name =>
          name === 'receive' ? setIsReceive(true) : setIsReceive(false)
        }>
        <Segment name="send" content={t('tx.send')} />
        <Segment name="receive" content={t('tx.receive')} />
      </SegmentedControl>
      {renderContainer()}
    </ScrollView>
  );
};

export default SendReceiveScreen;
