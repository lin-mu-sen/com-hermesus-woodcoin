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
import { SendContainerWood } from 'components/Send/send2';
import { Logs } from 'services/logs';

const SendReceiveScreenLog = ({ route }) => {
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
      route.params.coin,
    );
    // Logs.info("WalletStore.getWalletAddressByChain():",WalletStore.getWalletAddressByChain("LOG"));

    setAddress(WalletStore.getWalletAddressByChain("LOG") ?? '');
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
        <SendContainerWood
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
      scrollEnabled={false}
      showsVerticalScrollIndicator={false}
      style={{
        backgroundColor: Colors.darkgreen
      }}
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

export default SendReceiveScreenLog;
