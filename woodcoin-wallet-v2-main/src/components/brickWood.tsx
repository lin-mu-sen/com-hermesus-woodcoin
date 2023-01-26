import React from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { observer } from 'mobx-react-lite';
import { CoinsAvatar } from 'components/coinsAvatar';
import Svg, { Path } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';
import { BlurView } from '@react-native-community/blur';
import LinearGradient from 'react-native-linear-gradient';
import RadialGradient from "react-native-radial-gradient"
import { WalletStore } from 'stores/wallet';
import { formatCoins, formatPrice } from 'utils';
import { Colors } from 'utils/colors';
import Fonts from "../utils/fonts"
import { LineChart } from 'react-native-chart-kit';
import { MarketStore } from 'stores/market';

const BrickWood = observer((props: any) => {
  const [name, setName] = React.useState('-');
  const color = '#3E6069';
  const navigation: any = useNavigation();
  const { t } = useTranslation();
  const wallet = WalletStore.getWalletByCoinId("LOG", "LOG");
  // console.log(wallet);
  
  React.useEffect(() => {
    // setName(wallet?.name!);
    setName("Woodcoin[LOG]");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderBody = () => {
   
    if (props.coin !== '_END_') {
      return (
        <>
          <Text adjustsFontSizeToFit numberOfLines={1} style={styles.dollar}>
            {wallet?.price ? formatPrice(Number(wallet?.price)*Number(wallet?.balance), true) : formatPrice(0, true) + "/ LOG"}
          </Text>
          <Text adjustsFontSizeToFit numberOfLines={1} style={styles.coinValue}>
            {wallet?.balance ? Number(wallet?.balance).toFixed(4) : formatCoins(0)} {props.coin}
          </Text>
        </>
      );
    } else {
      return (
        <>
          <Text
            adjustsFontSizeToFit
            numberOfLines={1}
            style={[
              styles.coinName,
              // eslint-disable-next-line react-native/no-inline-styles
              { color: '#fff', marginBottom: 20 },
            ]}>
            {t('bricks.all_wallets')}
          </Text>
          <Text adjustsFontSizeToFit numberOfLines={2} style={styles.endBrick}>
            {t('bricks.check_portfolio')}
          </Text>
        </>
      );
    }
  };
  let _data:any = MarketStore.coins[0];
  // console.log();
  
  return (
    <TouchableOpacity
      style={[
        {
          width: 220,
          height: 140,
          margin: 7,
          borderRadius: 15,
          backgroundColor:"#3E6069"
        },
        // eslint-disable-next-line react-native/no-inline-styles
        {
          // backgroundColor: color,
          shadowColor: '#444',
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.1,
          shadowRadius: 4,

          elevation: 10,
        },
      ]}
      onPress={() => {
        // Alert.alert("no found", "we still working on native integration")
        // navigation.navigate('CoinDetailScreen', {
        //   title: name.toLowerCase(),
        //   symbol: props.coin,
        //   chain: "woodcoin",
        //   coin:"Log"
        // })
        navigation.navigate('WoodcoinWalletScreen', {
          symbol: "LOG",
          chain: "LOG",
          coin:"woodcoin"
        })
      }
      }>
     
      <View
        style={{
          width: 220,
          height: 140,
          borderRadius: 15,
        }}
        // blurType="ultraThinMaterial"
        // blurAmount={20}
      >
        <View style={styles.container}>
          <View style={styles.tcontainer}>
            <View style={styles.logo}>
              <CoinsAvatar
                style={styles.logoimg}
                coin={props.coin}
                // source={wallet?.image}
                source={"https://assets.coingecko.com/coins/images/346/large/woodcoin2.png"}
              />
            </View>
            <Text adjustsFontSizeToFit numberOfLines={2} style={styles.coinName}>
              {/* {name} */}
              Woodcoin
            </Text>
          </View>
          <View style={styles.bcontainer}>{renderBody()}</View>
        </View>
        <LineChart
        withVerticalLabels={false}
        withHorizontalLabels={false}
        withHorizontalLines={false}
        width={220*.5}
        height={140*.5}
        withShadow={false}
        withInnerLines={false}
        withDots={false}
        withVerticalLines={false}
        withOuterLines={false}
        chartConfig={{
          color: () => '#fff',
          strokeWidth:1,
          backgroundGradientFromOpacity: 0,
          backgroundGradientToOpacity: 0,
          fillShadowGradient: Colors.background,
        }}
        style={{...styles.chart}}
        data={{
          datasets: [
            {
              data: _data?.sparkline_in_7d?.price || []
            },
          ],
        } as any}
      />
      </View>
      {/* <Svg viewBox="0 0 400 150" preserveAspectRatio="none" style={styles.svg}>
        <Path
          d="M0 49.98c149.99 100.02 349.2-99.96 500 0V150H0z"
          fill={Colors.wave}
          opacity="0.5"
        />
      </Svg> */}
    </TouchableOpacity>
  );
});
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  chart: {
    paddingRight: 0,
    // paddingBottom: 20,
    // paddingTop: 20,
    position:"absolute",
    bottom:10,
    right:10
  },
  logoimg: {
    width: 30,
    height: 30,
    opacity: 1,
  },
  dollar: {
    fontSize: 17,
    marginBottom: 2,
    color: '#fff',
    fontFamily: Fonts.regular,
  },
  coinValue: {
    fontSize: 13,
    marginBottom: -5,
    color: '#fff',
    fontFamily: Fonts.regular,
  },
  endBrick: {
    fontSize: 12,
    marginBottom: 6,
    color: '#fff',
    fontFamily: Fonts.regular,
  },
  svg: {
    height: '40%',
    width: '140',
    margin: 0,
    bottom: 0,
    position: 'absolute',
    zIndex: -1,
    borderRadius: 20,
  },
  tcontainer: {
    flex: 1,
    // backgroundColor: "#3E6069",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  bcontainer: { justifyContent: 'flex-end', margin: 10, marginBottom: 20 },
  logo: {
    width: 45,
    height: 45,
    // backgroundColor: 'white',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
  },
  coinName: {
    fontSize: 16,
    fontFamily: Fonts.FSPRO,
    fontWeight: 'bold',
    marginBottom: 20,
    marginHorizontal: 20,
    color: '#fff',
  },
  brick: {
    width: 140,
    height: 200,
    margin: 7,
    borderRadius: 15,
    // padding: 10,
  },
});

export default React.memo(BrickWood);
