import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import FastImage from 'react-native-fast-image';
import { Colors } from 'utils/colors';

export function CoinsAvatar(props: any) {
  // console.log(props.source);

  if (props.coin !== '_END_') {
    return (
      <FastImage
        style={props.style}
        source={{
          uri: props.source,
          headers: {
            "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:100.0) Gecko/20100101 Firefox/100.0",
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
            "Accept-Language": "en-US,en;q=0.5",
            "Accept-Encoding": "gzip, deflate, br",
            "DNT": "1",
            "Connection": "keep-alive",
            "Cookie": "_ga_LJR3232ZPB=GS1.1.1653517333.1.1.1653517394.0; _ga=GA1.1.1010539793.1653517334; __cf_bm=xWL3Ebg8pOmKp6pvaEPq0ONfs6JsR.Ibk.0MNoCovkQ-1653610574-0-AZaOhK+0hfntCBA9AyZMsqdi12dh0cT/e6r4JKaFZOaWeAfQXUjEYoGOUR8PxYD8PlWOoQumsA57WeWNrd5Z0GY=; cf_chl_2=c4d9bd3e11ee421; cf_chl_prog=x12; cf_clearance=HMgTBCnrpCauCIRJdbovLsLBwKJNXOKWQoB17DfLSA0-1653610574-0-150",
            "Upgrade-Insecure-Requests": "1",
            "Sec-Fetch-Dest": "document",
            "Sec-Fetch-Mode": "navigate",
            "Sec-Fetch-Site": "cross-site",
            "If-None-Match": "4da8d451d50db0a438f1d74bc5b9c544",
            "TE": "trailers"
          },
          priority: FastImage.priority.normal,
          cache: FastImage.cacheControl.web,
        }}
      />
    );
  } else {
    return <Icon name="wallet" size={30} color="#70868F" />;
  }
}
