/* eslint-disable react/react-in-jsx-scope */
import PINCode from '@haskkor/react-native-pincode';
import {Colors} from '../utils/colors';
import {useTranslation} from 'react-i18next';
import {StyleSheet} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
export function Pincode(props) {
  const {t} = useTranslation();
  const icon_arrow = <Icon name="leftcircleo" color={Colors.foreground} />;
  return (
    <PINCode
      onFail={props.onFail}
      finishProcess={props.onSuccess}
      status={props.status}
      onClickButtonLockedPage={() => {
        if (props.onClickButtonLockedPage) {
          props.onClickButtonLockedPage();
        }
      }}
      colorCircleButtons="#fff"
      stylePinCodeButtonCircle={{
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
      }}
      stylePinCodeDeleteButtonText={{color: '#000'}}
      colorPassword="#48C57D"
      colorPasswordEmpty={Colors.foreground}
      numbersButtonOverlayColor={Colors.lighter}
      stylePinCodeColorSubtitle={Colors.foreground}
      stylePinCodeColorTitle={Colors.foreground}
      stylePinCodeDeleteButtonColorShowUnderlay={Colors.foreground}
      stylePinCodeDeleteButtonColorHideUnderlay={Colors.foreground}
      stylePinCodeButtonNumber="#000"
      stylePinCodeTextButtonCircle={styles.pinCode}
      stylePinCodeTextSubtitle={styles.pinCode}
      stylePinCodeTextTitle={styles.pinCode}
      styleLockScreenButton={{transform: [{scale: 0}]}}
      stylePinCodeHiddenPasswordSizeEmpty={12}
      stylePinCodeHiddenPasswordSizeFull={18}
      stylePinCodeColumnDeleteButton={{
        borderRadius: 30,
        height: 62,
        width: 62,
        backgroundColor: '#fff',
        marginTop: 2,
        paddingTop: 18,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
      }}
      stylePinCodeDeleteButtonIcon="keyboard-backspace"
      stylePinCodeDeleteButtonSize={50}
      buttonDeleteText=""
      subtitleChoose={t('pincode.subtitleChoose')}
      subtitleError={t('pincode.subtitleError')}
      textButtonLockedPage={t('pincode.textButtonLockedPage')}
      textCancelButtonTouchID={t('pincode.textCancelButtonTouchID')}
      textDescriptionLockedPage={t('pincode.textDescriptionLockedPage')}
      textSubDescriptionLockedPage={t('pincode.textSubDescriptionLockedPage')}
      textTitleLockedPage={t('pincode.textTitleLockedPage')}
      titleAttemptFailed={t('pincode.titleAttemptFailed')}
      titleChoose={t('pincode.titleChoose')}
      titleConfirm={t('pincode.titleConfirm')}
      titleConfirmFailed={t('pincode.titleConfirmFailed')}
      titleEnter={t('pincode.titleEnter')}
      titleValidationFailed={t('pincode.titleValidationFailed')}
      touchIDSentence={t('pincode.touchIDSentence')}
      touchIDTitle={t('pincode.touchIDTitle')}
    />
  );
}

const styles = StyleSheet.create({
  pinCode: {
    fontWeight: '600',
  },
});
