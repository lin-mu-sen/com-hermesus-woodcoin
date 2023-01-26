/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View} from 'react-native';
import {observer} from 'mobx-react-lite';
import SmallCard from '../smallCard';
import {MarketStore} from 'stores/market';
import {useNavigation} from '@react-navigation/native';
export const ListPrices = observer(() => {
  const navigation:any = useNavigation();
  return (
    <View style={{flex: 1, marginLeft: 0}}>
      {MarketStore.coins.length > 0
        ? MarketStore.coins.slice(0, 3).map((i:any) => {
          // console.log(i);
          
          return(
            <SmallCard
              coin={i.symbol}
              key={i.id}
              name={i.name}
              price={i.current_price}
              data={i.sparkline_in_7d.price}
              image={i.image}
              change={i.price_change_percentage_24h}
              onPress={() =>
                navigation.navigate('CoinDetailScreen', {
                  coin: i.id,
                  title: i.symbol,
                  showAdd: false,
                })
              }
            />
          )})
        : null}
    </View>
  );
});
