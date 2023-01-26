import React, {useEffect, createRef} from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Linking,
  Alert,
  Switch,
} from 'react-native';
import {InAppBrowser} from 'react-native-inappbrowser-reborn';
import ActionSheet from 'react-native-actions-sheet';
import Clipboard from '@react-native-clipboard/clipboard';
import {showMessage} from 'react-native-flash-message';
import {SettingsStore} from 'stores/settings';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/FontAwesome';
import Icon3 from 'react-native-vector-icons/Fontisto';
import Icon4 from 'react-native-vector-icons/MaterialIcons';
import {useTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/native';
import {Colors} from 'utils/colors';
import {clearAllAppData} from 'utils';
import {SmallButton} from 'components/smallButton';
import CONFIG from 'config.sample';
import {styles} from './styles';
import {observer} from 'mobx-react-lite';
import Fonts from 'utils/fonts';

const actionSheetRef = createRef();

const SettingScreen = observer(() => {
  const {t} = useTranslation();
  const navigation:any = useNavigation();

  useEffect(() => {}, []);

  const copyToClipboard = () => {
    Clipboard.setString(CONFIG.mnemonic);
    SettingsStore.setMnemonicBackupDone(true);
    showMessage({
      message: t('message.success.mnemonic_copied'),
      type: 'success',
    });
    //@ts-ignore
    actionSheetRef.current?.setModalVisible(false);
  };

  const deleteWallets = async () => {
    Alert.alert(
      t('settings.delete_wallets'),
      t('settings.alert_delete_wallets'),
      [
        {
          text: t('settings.cancel'),
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: t('settings.yes'),
          onPress: async () => {
            await clearAllAppData();
          },
        },
      ],
    );
  };

  const openLink = async url => {
    try {
      if (await InAppBrowser.isAvailable()) {
        await InAppBrowser.open(url, {
          // iOS Properties
          dismissButtonStyle: 'cancel',
          readerMode: false,
          animated: true,
          modalPresentationStyle: 'automatic',
          modalTransitionStyle: 'coverVertical',
          modalEnabled: true,
          enableBarCollapsing: false,
          // Android Properties
          showTitle: true,
          enableUrlBarHiding: true,
          enableDefaultShare: true,
          forceCloseOnRedirection: false,
        });
      } else {
        Linking.openURL(url);
      }
    } catch (error) {
      console.log(error);
    }
  };

  /*  const badge = () => <View style={styles.badge} />; */

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollview}
        // stickyHeaderIndices={[0]}
        showsVerticalScrollIndicator={false}>
          {/* <Text style={[styles.subtitle, {
            marginHorizontal:10,
            paddingVertical:15,
            width:"100%",
            // fontFamily:Fonts.Bold,
            // fontSize:17,
            // fontWeight:"700",
            backgroundColor:"#fff"
          }]}>{t('settings.wallet')}</Text> */}
        <View>
          <TouchableOpacity
            style={styles.item}
            onPress={() => {
              //@ts-ignore
              actionSheetRef.current?.setModalVisible();
            }}>
            {/* {SettingsStore.mnemonicBackupDone ? null : badge()} */}
            <Icon2 name="lock" size={23} color={Colors.card}  />
            <Text style={styles.textItem}>{t('settings.backup_phrase')}</Text>
            <Icon4 name="arrow-forward-ios" size={20} color={Colors.card}  />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.item}
            onPress={() => navigation.navigate('LanguageScreen')}>
            <Icon3 name="world" size={24} color={Colors.card} />
            <Text style={styles.textItem}>{t('settings.change_language')}</Text>
            <Icon4 name="arrow-forward-ios" size={20} color={Colors.card}  />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.item}
            onPress={() =>
              SettingsStore.setConfirmation(!SettingsStore.confirmationEnabled)
            }>
            <Icon name="reader" size={23} color={Colors.card} />
            <Text style={styles.textItem}>{t('settings.unconfirmed')}</Text>
            <Switch
              trackColor={{false: 'grey', true: '#48C57D'}}
              thumbColor={
                SettingsStore.confirmationEnabled
                  ? Colors.background
                  : Colors.background
              }
              ios_backgroundColor={
                SettingsStore.confirmationEnabled
                  ? Colors.background
                  : Colors.background
              }
              onValueChange={() =>
                SettingsStore.setConfirmation(
                  !SettingsStore.confirmationEnabled,
                )
              }
              value={SettingsStore.confirmationEnabled}
            />
          </TouchableOpacity>
          <Text style={styles.unconfirmed}>
            {t('settings.unconfirmed_txt')}
          </Text>
        </View>
        <View>
          <Text style={styles.subtitle}>{t('settings.about')}</Text>
          <TouchableOpacity
            style={styles.item}
            onPress={() =>
              openLink(
                'https://woodcoin.org/privacy.html',
              )
            }>
            <Icon name="shield" size={23} color={Colors.card} />
            <Text style={styles.textItem}>
              {t('settings.privacy_and_policy')}
            </Text>
            <Icon4 name="arrow-forward-ios" size={20} color={Colors.card}  />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.item}
            onPress={() => openLink('https://woodcoin.ru/terms.html')}>
            <Icon name="document-text" size={23} color={Colors.card}  />
            <Text style={styles.textItem}>
              {t('settings.terms_of_services')}
            </Text>
            <Icon4 name="arrow-forward-ios" size={20} color={Colors.card} />
          </TouchableOpacity>
          {/* <TouchableOpacity
            style={styles.item}
            onPress={() => openLink('https://oldi.ru')}>
            <Icon name="link" size={23} color={Colors.black} />
            <Text style={styles.textItem}>{t('settings.website')}</Text>
            <Icon name="arrow-forward-ios" size={20} color="gray" />
          </TouchableOpacity> */}
          {/* <TouchableOpacity
            style={styles.item}
            onPress={() => openLink('https://twitter.com/Coingrig')}>
            <Icon name="logo-twitter" size={23} color={Colors.black} />
            <Text style={styles.textItem}>{t('settings.twitter')}</Text>
            <Icon name="arrow-forward-ios" size={20} color="gray" />
          </TouchableOpacity> */}
          {/* <TouchableOpacity
            style={styles.item}
            onPress={() => openLink('https://github.com/Coingrig')}>
            <Icon name="logo-github" size={23} color={Colors.black} />
            <Text style={styles.textItem}>{t('settings.github')}</Text>
            <Icon name="arrow-forward-ios" size={20} color="gray" />
          </TouchableOpacity> */}
          {/*  <TouchableOpacity
            style={styles.item}
            onPress={() => openLink('https://Coingrig.com/credits')}>
            <Icon name="layers" size={23} color={Colors.black} />
            <Text style={styles.textItem}>{t('settings.credits')}</Text>
            <Icon4 name="arrow-forward-ios" size={20} color="gray" />
          </TouchableOpacity> */}
        </View>
        {/* <Text
          // eslint-disable-next-line react-native/no-inline-styles
          style={{marginVertical: 20, color: Colors.black}}>
          {t('settings.version')}: {CONFIG.APP_VERSION}
        </Text> */}
        <TouchableOpacity
          style={styles.itemDelete}
          onPress={() => deleteWallets()}>
          <Icon2 name="trash" size={23} color="white" />
          <Text style={styles.textDelete}>{t('settings.delete_wallets')}</Text>
        </TouchableOpacity>
      </ScrollView>
      <ActionSheet
        //@ts-ignore
        ref={actionSheetRef}
        gestureEnabled={true}
        headerAlwaysVisible
        // eslint-disable-next-line react-native/no-inline-styles
        containerStyle={{flex: 1, backgroundColor: Colors.darkgreen}}>
        <View style={{backgroundColor: Colors.darkgreen}}>
          <Text
            // eslint-disable-next-line react-native/no-inline-styles
            style={{
              fontSize: 20,
              textAlign: 'center',
              marginTop: 15,
              fontFamily: Fonts.Bold,
              color: Colors.light,
            }}>
            {t('setup.your_recovery_phrase')}
          </Text>
          <View style={styles.mnemonicsContainer}>
            <Text selectable style={styles.mnemonics}>
              {CONFIG.mnemonic}
            </Text>
          </View>
        </View>
        <SmallButton
          text={t('setup.copy')}
          onPress={() => copyToClipboard()}
          // eslint-disable-next-line react-native/no-inline-styles
          style={{backgroundColor: Colors.btnback, marginTop: 30,  borderColor:Colors.btnback,}}
          color={Colors.light}
        />
        <Text style={styles.paragraph}>{t('setup.copy_these_words')}</Text>
      </ActionSheet>
    </View>
  );
});

export default SettingScreen;
