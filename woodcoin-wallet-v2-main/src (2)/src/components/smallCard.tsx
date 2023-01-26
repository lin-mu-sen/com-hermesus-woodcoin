import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {observer} from 'mobx-react-lite';
import {CoinsAvatar} from 'components/coinsAvatar';
import {LineChart} from 'react-native-chart-kit';
import {formatPrice} from '../utils';
import {Colors} from 'utils/colors';
import Fonts from 'utils/fonts';

const SmallCard = observer(
  (props: {
    coin: string;
    key: string;
    name: string;
    price: number;
    data: [];
    image: string;
    change: number;
    onPress?: any;
  }) => {
    // console.log(props.data);
    
    return (
      <TouchableOpacity onPress={props.onPress ? props.onPress : null}>
        <View style={styles.container}>
          <View style={styles.card}>
            <View style={styles.logo}>
              <CoinsAvatar
                style={styles.logoimg}
                coin={props.coin}
                source={props.image}
              />
            </View>
            <View style={styles.mcontainer}>
              <Text
                adjustsFontSizeToFit
                numberOfLines={2}
                style={styles.coinName}>
                {props.name}
              </Text>
              <Text style={styles.coinSymbol}>{props.coin.toUpperCase()}</Text>
            </View>
            <View style={styles.chartContainer}>
              <View style={{justifyContent: 'center', alignSelf: 'flex-end'}}>
                <LineChart
                  withVerticalLabels={false}
                  withHorizontalLabels={false}
                  withHorizontalLines={false}
                  width={90}
                  height={30}
                  bezier
                  withDots={false}
                  withVerticalLines={false}
                  withOuterLines={false}
                  chartConfig={{
                    color: () => '#48C57D',
                    backgroundGradientFromOpacity: 0,
                    backgroundGradientToOpacity: 0,
                    fillShadowGradient: Colors.background,
                  }}
                  style={styles.chart}
                  data={{
                    datasets: [
                      {
                        data: props.data.slice(
                          props.data.length - Math.round(props.data.length / 7),
                          props.data.length,
                        ),
                      },
                    ],
                  } as any}
                />
              </View>
            </View>
            <View style={styles.rcontainer}>
              <View style={styles.bgprice}>
                <Text style={styles.price}>{formatPrice(props.price)}</Text>
              </View>
              <Text
                style={[
                  styles.price,
                  {color: props.change > 0 ? '#5cb85c' : '#d9534f'},
                ]}>
                {props.change.toFixed(2)}%
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    borderRadius: 16,
    margin: 5,
    shadowColor: 'rgba(0,0,0,0.18)',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 1.84,

    elevation: 5,
  },
  logoimg: {
    width: 30,
    height: 30,
    justifyContent: 'center',
  },
  coinSymbol: {
    fontSize: 13,
    marginBottom: 5,
    fontFamily: Fonts.regular,
    color: Colors.lighter,
  },
  chart: {
    paddingRight: 0,
    paddingBottom: 20,
    paddingTop: 20,
  },
  mcontainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    marginLeft: 10,
    flex: 1,
  },
  chartContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    marginLeft: 0,
    flex: 1,
  },
  coinName: {
    fontSize: 15,
    marginBottom: 2,
    fontFamily: Fonts.Bold,
    color: '#27424F',
  },
  price: {
    fontSize: 13,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginVertical: 3,
  },
  logo: {
    width: 35,
    height: 35,
    alignSelf: 'center',
    backgroundColor: Colors.background,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 0,
  },
  bgprice: {
    padding: 2,
    backgroundColor: '#70868F',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  rcontainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    marginLeft: 15,
    flex: 0.9,
  },
  card: {
    flexDirection: 'row',
    flex: 1,
    height: 90,
    borderRadius: 10,
    padding: 10,
    backgroundColor: Colors.card,
    justifyContent: 'center',
    marginHorizontal: 15,
    marginVertical: 3,
  },
});

export default React.memo(SmallCard);
