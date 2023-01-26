import React, { useEffect } from 'react';
import {Image, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {BigButton} from '../../components/bigButton';
import {useTranslation} from 'react-i18next';
import {Colors} from 'utils/colors';
import {styles} from './styles';
import Svg, {Path} from 'react-native-svg';
import Logo from 'components/icons/Logo';
import { SVPModule } from 'utils/woodcoin';
import { WalletGenerator } from '@coingrig/core';
const StartScreen = () => {
  const navigation = useNavigation();
  const {t} = useTranslation();
  useEffect(() => {
    // if(RCTSVPModule){
      // const newMnemonic = WalletGenerator.generateMnemonic();
      // SVPModule.createwallet().then((res)=>{
      //   console.log(res);
      //   let i = 0
      //     setInterval(()=>{
      //       SVPModule.getstatus().then((ef)=>{
      //         console.log(`[${i++}]`,ef);
      //       })
      //     }, 5000)
      // }).catch(()=>{

      // })
    // } else {
    //   console.log("no RCTSVPModule!");
    // }
  }, [])
  
  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
          <Logo size={140} />
        {/* <Text style={[styles.logo, {color: "#fff"}]}>Woodcoin</Text> */}
      </View>
      <View style={styles.bottomContainer}>
        <BigButton
          text={t('init.new_wallet')}
          backgroundColor="#48C57D"
          color={Colors.light}
          // color={Colors.background}
          //@ts-ignore
          onPress={() => navigation.navigate('SetPinScreen', {new: true})}
        />
        <BigButton
          text={t('init.import_wallet')}
          backgroundColor={Colors.btnback}
          color={Colors.light}
          //@ts-ignore
          onPress={() => navigation.navigate('SetPinScreen', {new: false})}
        />
      </View>
      {/*  <Svg
        viewBox="0 0 400 150"
        preserveAspectRatio="none"
        style={styles.waves}>
        <Path
          d="M0 49.98c149.99 100.02 349.2-99.96 500 0V150H0z"
          fill={Colors.waveborder}
          opacity="0.9"
        />
      </Svg>
      <Svg
        viewBox="0 0 400 150"
        preserveAspectRatio="none"
        style={styles.waves2}>
        <Path
          d="M0 49.98c149.99 100.02 349.2-99.96 500 0V150H0z"
          fill={Colors.darker}
          // opacity="0.7"
        />
      </Svg> */}
    </View>
  );
};

export default StartScreen;
