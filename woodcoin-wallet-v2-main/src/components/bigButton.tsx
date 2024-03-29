import React from 'react';
import {Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Colors} from 'utils/colors';
import Fonts from 'utils/fonts';

export function BigButton(props) {
  return (
    <TouchableOpacity
      {...props}
      style={[styles.bigBtn, {backgroundColor: props.backgroundColor}]}
      onPress={() => props.onPress()}>
      <Text
        style={[
          styles.bigBtnText,
          // eslint-disable-next-line react-native/no-inline-styles
          {color: props.disabled ? 'gray' : props.color},
        ]}>
        {props.text}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  bigBtn: {
    padding: 15,
    borderRadius: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 5,
    minWidth: '90%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },
  bigBtnText: {
    fontSize: 20,
    fontFamily: Fonts.Bold,
    textAlign: 'center',
  },
});
