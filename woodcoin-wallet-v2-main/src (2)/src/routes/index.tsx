/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { LogBox } from 'react-native';
import 'react-native-gesture-handler';
import { Image, Platform, View, Text } from 'react-native';
import {
  createStackNavigator,
  CardStyleInterpolators,
  HeaderStyleInterpolators,
} from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
//import Icon2 from 'react-native-vector-icons/Foundation';
import { withTranslation } from 'react-i18next';
import SplashScreen from 'screens/Splash';
import DashboardScreen from 'screens/Dashboard';
import SearchScreen from 'screens/Search';
import GenerateWalletScreen from 'screens/WalletSetup/generateWallet';
import ValidateWalletScreen from 'screens/WalletSetup/validateWallet';
import StartScreen from 'screens/Start';
/* import HubScreen from 'screens/Hub'; */
import SwapScreen from 'screens/Swap';
import EnterPinScreen from 'screens/Pin/enterPin';
import ReEnterPinScreen from 'screens/Pin/reEnterPin';
import SetPinScreen from 'screens/Pin/setPin';
import ImportWalletScreen from 'screens/WalletSetup/importWallet';
import SettingScreen from 'screens/Settings';
import LanguageScreen from 'screens/Language';
import SendReceiveScreen from 'screens/SendReceive';
import WalletScreen from 'screens/Wallet';
import MarketScreen from 'screens/Market';
import PortfolioScreen from 'screens/Portfolio';
import NewsScreen from 'screens/News';
import CoinDetailScreen from 'screens/CoinDetails';
import OnBoardingScreen from 'screens/Onboarding';
import WalletconnectScreen from 'screens/Walletconnect';
import CustomTokenScreen from 'screens/CustomToken';
import TokenConnectScreen from 'screens/TokenConnect';
import NFTScreen from 'screens/Portfolio/NFTDetails';
/* import {SearchScreen} from 'screens/Search'; */
import { Colors } from 'utils/colors';
import CONFIG from '../config.sample';
import styles from './styles';
import Svg, { G, Path } from 'react-native-svg';
/* import {SettingsStore} from 'stores/settings'; wallet blockchain */
import Fonts from "../utils/fonts"
import { SafeAreaView } from 'react-native-safe-area-context';
import WoodcoinWalletScreen from 'screens/Wallet/woodcoinwallet';
import SendReceiveScreenLog from 'screens/SendReceive/woodcoin';
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
LogBox.ignoreAllLogs()
const isTestnet = () => {
  if (CONFIG.TESTNET) {
    return (
      <View
        style={{
          backgroundColor: '#d9534f',
          padding: 5,
          borderRadius: 5,
          marginLeft: 15,
        }}>
        <Text
          style={{
            color: 'white',
            fontSize: 10,
          }}>
          TESTNET
        </Text>
      </View>
    );
  }
};

/* const TabLogo = (inverse = false) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Image
        source={require('../assets/logo_small.png')}
        style={{
          height: 280 / 13,
          width: 279 / 13,
          tintColor: inverse ? Colors.foreground : '#48C57D',
          // marginLeft: 3,
        }}
      />
    </View>
  );
}; */

//logo on left side of the screen
const SmallLogo = () => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <View>
        <Svg width="46" height="45" fill="none" viewBox="0 0 96 95">
          <Path
            fill="#48C57D"
            fillRule="evenodd"
            d="M34.82 7.437c-4.993 1.662-8.624 3.54-12.837 6.656-2.667 2.06-4.699 4-6.874 6.56.326-.842.68-1.673 1.062-2.493a44.743 44.743 0 015.282-4.745c5.058-3.728 9.415-5.817 15.502-7.484 4.934-1.213 8.896-1.594 13.97-1.313-5.046-.012-8.955.566-13.783 2.018-.786.248-1.55.511-2.322.801zM.103 50.434a48.07 48.07 0 001.477 8.927c1.866 6.618 4.208 11.36 8.38 16.859 4.168 5.177 8.067 8.553 13.806 11.967 5.834 3.255 10.732 4.95 17.352 5.99 6.91.887 12.248.573 19.016-1.07 3.38-.926 6.278-1.97 9.034-3.303-.285-.17-.563-.35-.834-.54-2.811 1.309-5.365 2.226-8.414 3.037-6.647 1.612-11.894 1.923-18.68 1.052-6.503-1.023-11.316-2.688-17.046-5.885-5.638-3.354-9.469-6.67-13.564-11.757-4.099-5.403-6.398-10.06-8.232-16.562C1.221 54.524.775 50.746.868 45.98a44.21 44.21 0 00-.764 4.455zM6.68 28.14C4.635 32.516 3.51 36.18 2.756 40.944c-.857 6.484-.553 11.497 1.035 17.848a46.177 46.177 0 002.96 7.996A46.217 46.217 0 013.92 58.76c-1.48-6.337-1.706-11.325-.748-17.757 1.091-6.124 2.779-10.64 5.973-16 1.747-2.793 3.452-5.005 5.713-7.41a45.908 45.908 0 015.766-5.235c5.215-3.844 9.711-6 15.987-7.72 5.667-1.384 10.173-1.739 15.988-1.218-5.825-.612-10.346-.322-16.05.983-6.356 1.641-10.923 3.75-16.243 7.547-5.04 3.822-8.342 7.42-11.71 12.735a48.129 48.129 0 00-1.917 3.454zM1.216 45.197c.196-1.49.447-2.895.779-4.362a46.579 46.579 0 011.866-6.126 46.534 46.534 0 00-1.367 6.197c-.863 6.523-.556 11.565 1.04 17.953.87 3.177 1.863 5.794 3.329 8.752a46.194 46.194 0 004.61 7.461c3.95 5.029 7.667 8.321 13.15 11.672 5.601 3.214 10.316 4.906 16.707 5.987 6.702.944 11.89.695 18.482-.826a49.03 49.03 0 008.139-2.802A49.143 49.143 0 0159.837 92c-6.602 1.603-11.813 1.91-18.554 1.044-6.46-1.016-11.24-2.669-16.931-5.845-5.6-3.331-9.406-6.625-13.472-11.677-4.07-5.365-6.355-9.993-8.179-16.45-1.24-4.886-1.672-8.843-1.488-13.875h.003zm5.429 4.815c.2 2.731.588 5.06 1.274 7.714 1.612 5.714 3.63 9.805 7.232 14.554 3.598 4.47 6.968 7.385 11.922 10.332 5.036 2.809 9.267 4.273 14.982 5.173 5.965.765 10.572.492 16.414-.926 2.088-.572 3.962-1.196 5.73-1.927.154.245.315.486.483.722-1.942.82-3.83 1.455-5.992 2.032-5.965 1.447-10.67 1.726-16.76.943-5.836-.917-10.155-2.412-15.296-5.281-5.059-3.01-8.498-5.986-12.172-10.55-3.678-4.847-5.739-9.025-7.384-14.858-1.056-4.152-1.458-7.541-1.373-11.82.248 1.311.56 2.607.938 3.889l.002.003zM8.423 28.95c.54-1.16 1.1-2.253 1.733-3.367 3.09-5.234 6.173-8.804 10.925-12.644 5.082-3.874 9.484-6.068 15.648-7.858 5.603-1.459 10.068-1.879 15.847-1.455-5.785-.517-10.27-.164-15.911 1.214-6.245 1.711-10.72 3.857-15.91 7.682a45.755 45.755 0 00-5.738 5.21c-2.164 2.457-3.781 4.704-5.422 7.527-2.962 5.363-4.48 9.847-5.354 15.895-.719 6.265-.346 11.088 1.284 17.188.8 2.75 1.695 5.056 2.97 7.626a44.23 44.23 0 01-2.838-7.66c-1.52-6.084-1.812-10.882-.991-17.094.723-4.561 1.8-8.07 3.758-12.264zM5.407 45.39c-.168 4.582.227 8.184 1.357 12.633 1.658 5.879 3.735 10.088 7.441 14.974 3.703 4.6 7.168 7.597 12.266 10.63 5.182 2.892 9.532 4.398 15.415 5.322 6.137.787 10.877.507 16.888-.952a44.385 44.385 0 006.104-2.074l.011.015a44.412 44.412 0 01-6.09 2.156c-6.022 1.542-10.784 1.883-16.962 1.173-5.954-.858-10.368-2.325-15.642-5.179-5.216-3.013-8.772-6.014-12.592-10.636a43.546 43.546 0 01-4.53-6.93c-1.388-2.799-2.325-5.274-3.151-8.283-1.51-6.045-1.801-10.814-.986-16.987.672-4.255 1.657-7.57 3.416-11.51-1.536 4.003-2.34 7.342-2.78 11.6a43.499 43.499 0 00-.167 4.046l.002.002zm-5.02-4.01A46.27 46.27 0 000 47.261a44.314 44.314 0 011.06-4.305c.074-.745.163-1.477.271-2.218 1.037-6.41 2.726-11.153 5.97-16.801 3.403-5.557 6.767-9.333 11.929-13.37 4.406-3.263 8.21-5.275 13.404-7.102-5.236 1.75-9.085 3.707-13.559 6.909-5.268 3.988-8.72 7.744-12.243 13.29C3.447 29.346 1.66 34.13.503 40.619c-.041.253-.08.506-.118.758l.002.003zM51.856 2.507c-5.62-.404-9.99-.02-15.46 1.32-6.394 1.751-10.976 3.949-16.289 7.865a47.216 47.216 0 00-4.966 4.377 47.284 47.284 0 015.017-4.313c5.34-3.83 9.928-5.964 16.317-7.63 6.403-1.473 11.444-1.71 17.953-.787 6.203 1.054 10.78 2.7 16.217 5.826a47.124 47.124 0 015.292 3.674c2.98 2.382 5.2 4.603 7.569 7.58 3.9 5.14 6.086 9.571 7.83 15.757-1.655-6.23-3.783-10.707-7.612-15.923-3.856-4.94-7.488-8.179-12.85-11.48-5.486-3.17-10.109-4.845-16.376-5.926a48.887 48.887 0 00-2.642-.34zm-18.328.994c-5.486 1.826-9.477 3.887-14.107 7.314-2.93 2.263-5.162 4.395-7.551 7.207a45.832 45.832 0 012.491-1.522 47.278 47.278 0 015.585-5.016c5.346-3.939 9.953-6.149 16.384-7.91a48.149 48.149 0 018.358-1.371 47.58 47.58 0 00-8.524.747c-.889.163-1.756.344-2.633.55h-.003zM6.889 42.2c.024-.22.05-.439.08-.657.808-5.674 2.223-9.886 4.99-14.922 2.931-4.994 5.861-8.405 10.38-12.075 3.884-2.994 7.252-4.851 11.867-6.567-4.657 1.638-8.072 3.441-12.022 6.37-4.63 3.621-7.65 7.011-10.703 11.997-2.912 5.069-4.428 9.325-5.359 15.077a44.61 44.61 0 00-.255 2.131c.169 1.281.399 2.553.69 3.814 0-1.727.11-3.453.334-5.166l-.002-.002zM51.691 4.403c.855.06 1.691.141 2.542.246 6.079.859 10.59 2.343 15.98 5.239 5.34 3.063 8.983 6.12 12.9 10.83 3.954 5.038 6.192 9.402 8.018 15.515-1.736-6.156-3.913-10.567-7.793-15.682-2.36-2.963-4.568-5.173-7.536-7.545a46.799 46.799 0 00-5.351-3.515c-5.443-2.943-10-4.456-16.144-5.34-6.376-.732-11.29-.38-17.503 1.213-6.131 1.764-10.51 3.932-15.571 7.77a45.317 45.317 0 00-4.704 4.26 45.255 45.255 0 014.756-4.192c5.09-3.752 9.475-5.854 15.599-7.532 5.241-1.286 9.423-1.654 14.808-1.267z"
            clipRule="evenodd"
          />
          <Path
            fill="#48C57D"
            fillRule="evenodd"
            d="M61.18 5.233c4.993 1.663 8.624 3.54 12.837 6.656 2.668 2.06 4.699 4 6.874 6.56a40.146 40.146 0 00-1.062-2.492 44.751 44.751 0 00-5.282-4.746c-5.058-3.728-9.415-5.816-15.502-7.484-4.934-1.212-8.896-1.594-13.97-1.313 5.046-.012 8.955.566 13.783 2.018.786.249 1.55.512 2.322.801zm34.717 42.998a48.07 48.07 0 01-1.476 8.926c-1.867 6.618-4.209 11.36-8.38 16.86-4.169 5.176-8.068 8.552-13.807 11.966-5.834 3.256-10.732 4.95-17.352 5.99-6.91.887-12.247.573-19.016-1.07-3.38-.925-6.278-1.97-9.034-3.302.285-.171.563-.35.834-.54 2.811 1.308 5.365 2.225 8.415 3.037 6.646 1.612 11.893 1.922 18.68 1.051 6.502-1.022 11.315-2.687 17.045-5.885 5.638-3.354 9.469-6.67 13.564-11.757 4.099-5.403 6.398-10.06 8.232-16.562 1.177-4.625 1.623-8.402 1.53-13.17.33 1.471.586 2.958.764 4.455zM89.32 25.935c2.044 4.377 3.169 8.043 3.923 12.805.857 6.485.553 11.498-1.034 17.849a46.177 46.177 0 01-2.961 7.996 46.22 46.22 0 002.832-8.03c1.48-6.337 1.706-11.325.748-17.756-1.09-6.124-2.778-10.641-5.973-16.001-1.747-2.792-3.452-5.004-5.713-7.41a45.9 45.9 0 00-5.766-5.235c-5.215-3.844-9.711-6-15.987-7.719C53.723 1.05 49.217.694 43.402 1.215c5.825-.612 10.346-.322 16.051.983C65.808 3.84 70.375 5.95 75.695 9.745c5.04 3.822 8.342 7.42 11.71 12.736a48.148 48.148 0 011.917 3.453zm5.463 17.059a47.415 47.415 0 00-.779-4.363 46.57 46.57 0 00-1.866-6.126 46.52 46.52 0 011.368 6.197c.862 6.523.555 11.565-1.04 17.953-.871 3.178-1.864 5.795-3.33 8.752a46.196 46.196 0 01-4.61 7.462c-3.95 5.028-7.667 8.32-13.149 11.671-5.602 3.215-10.317 4.906-16.708 5.987-6.702.944-11.89.695-18.482-.825a49.021 49.021 0 01-8.139-2.803 49.156 49.156 0 008.114 2.899c6.602 1.602 11.813 1.91 18.554 1.044 6.46-1.016 11.24-2.67 16.931-5.845 5.6-3.332 9.406-6.626 13.472-11.677 4.07-5.366 6.355-9.994 8.179-16.45 1.24-4.887 1.672-8.843 1.488-13.876h-.003zm-5.428 4.814c-.2 2.732-.59 5.06-1.275 7.714-1.612 5.714-3.63 9.806-7.232 14.554-3.598 4.47-6.968 7.386-11.922 10.333-5.036 2.808-9.267 4.273-14.982 5.172-5.965.766-10.572.493-16.414-.926-2.088-.571-3.962-1.195-5.73-1.926-.154.244-.315.485-.483.721 1.942.82 3.83 1.455 5.992 2.032 5.965 1.447 10.67 1.726 16.76.944 5.836-.918 10.155-2.412 15.297-5.282 5.058-3.01 8.497-5.986 12.171-10.549 3.678-4.847 5.739-9.026 7.384-14.86 1.056-4.15 1.458-7.54 1.374-11.818a40.417 40.417 0 01-.939 3.888l-.001.003zm-1.779-21.061a45.758 45.758 0 00-1.733-3.368c-3.09-5.234-6.173-8.804-10.924-12.644-5.083-3.874-9.485-6.067-15.648-7.857-5.604-1.46-10.07-1.88-15.848-1.455 5.785-.518 10.27-.165 15.911 1.214 6.245 1.71 10.72 3.856 15.91 7.682a45.761 45.761 0 015.739 5.21c2.163 2.457 3.78 4.703 5.421 7.526 2.963 5.363 4.48 9.848 5.355 15.895.718 6.265.345 11.089-1.285 17.189a44.16 44.16 0 01-2.969 7.625 44.227 44.227 0 002.837-7.66c1.52-6.083 1.812-10.882.991-17.094-.723-4.561-1.8-8.07-3.757-12.263zm3.016 16.44c.168 4.581-.227 8.183-1.357 12.632-1.658 5.879-3.735 10.088-7.441 14.974-3.703 4.6-7.168 7.597-12.266 10.63-5.182 2.892-9.532 4.398-15.414 5.323-6.138.786-10.878.507-16.89-.952a44.384 44.384 0 01-6.103-2.075l-.011.015a44.408 44.408 0 006.09 2.157c6.022 1.542 10.784 1.883 16.962 1.172 5.954-.858 10.368-2.325 15.642-5.178 5.216-3.013 8.772-6.015 12.592-10.636a43.55 43.55 0 004.53-6.93c1.388-2.8 2.326-5.275 3.151-8.283 1.51-6.046 1.801-10.814.986-16.988-.672-4.255-1.657-7.57-3.416-11.51 1.536 4.003 2.34 7.342 2.78 11.6.12 1.368.173 2.674.167 4.047l-.002.002zm5.02-4.011c.254 1.95.383 3.915.387 5.882a44.284 44.284 0 00-1.06-4.304 48.544 48.544 0 00-.27-2.218c-1.038-6.41-2.727-11.153-5.97-16.802-3.404-5.556-6.768-9.332-11.93-13.37-4.406-3.263-8.21-5.275-13.404-7.101 5.237 1.75 9.086 3.707 13.559 6.908 5.268 3.988 8.72 7.745 12.243 13.291 3.385 5.68 5.172 10.464 6.329 16.953.041.253.08.505.118.758l-.001.003zM44.145.304c5.62-.403 9.99-.02 15.46 1.32 6.394 1.752 10.976 3.95 16.289 7.865a47.232 47.232 0 014.966 4.378 47.28 47.28 0 00-5.017-4.313c-5.34-3.831-9.928-5.964-16.317-7.632C53.122.45 48.081.214 41.572 1.136c-6.203 1.054-10.78 2.7-16.217 5.826a47.109 47.109 0 00-5.292 3.674c-2.98 2.382-5.2 4.604-7.568 7.58-3.9 5.14-6.087 9.572-7.831 15.757 1.655-6.23 3.783-10.706 7.612-15.922 3.856-4.941 7.488-8.18 12.85-11.48C30.613 3.399 35.236 1.725 41.503.644c.883-.138 1.752-.25 2.642-.34zm18.328.994C67.96 3.124 71.95 5.186 76.58 8.612c2.93 2.264 5.162 4.395 7.552 7.208a45.832 45.832 0 00-2.492-1.523 47.276 47.276 0 00-5.585-5.015C70.708 5.342 66.1 3.132 59.67 1.37A48.148 48.148 0 0051.312 0c2.996.003 5.575.232 8.524.747.889.163 1.756.345 2.633.55l.003.001zm26.639 38.698c-.024-.22-.05-.438-.08-.657-.808-5.673-2.223-9.886-4.99-14.922-2.931-4.994-5.86-8.404-10.38-12.074-3.884-2.994-7.252-4.852-11.867-6.567 4.657 1.638 8.072 3.44 12.022 6.37 4.63 3.62 7.65 7.01 10.703 11.997 2.912 5.068 4.428 9.324 5.359 15.077.103.712.187 1.415.255 2.13-.169 1.282-.399 2.553-.69 3.815 0-1.728-.11-3.453-.334-5.167l.002-.002zM44.309 2.2c-.855.06-1.691.14-2.542.246-6.079.858-10.59 2.342-15.98 5.238-5.34 3.063-8.983 6.12-12.9 10.831-3.954 5.038-6.192 9.401-8.018 15.514 1.736-6.156 3.913-10.566 7.793-15.682 2.36-2.963 4.568-5.173 7.536-7.545a46.814 46.814 0 015.351-3.514c5.443-2.944 10-4.457 16.144-5.341 6.376-.732 11.29-.379 17.504 1.213 6.13 1.765 10.51 3.933 15.57 7.771a45.327 45.327 0 014.704 4.26 45.275 45.275 0 00-4.756-4.193c-5.09-3.751-9.475-5.854-15.599-7.532C53.875 2.18 49.693 1.813 44.308 2.2z"
            clipRule="evenodd"
          />
          <Path
            fill="#48C57D"
            d="M89.561 46.655c0 23.183-18.612 41.977-41.57 41.977-22.96 0-41.571-18.794-41.571-41.977 0-23.183 18.612-41.977 41.57-41.977 22.96 0 41.571 18.794 41.571 41.977z"
          />
          <Path
            fill="#fff"
            d="M46.699 23.718c1.088.49 2.16.962 3.214 1.417 1.224.595 2.091 1.4 2.601 2.414-.646.594-1.258 2.046-1.836 4.355-.544 2.064-.816 3.69-.816 4.88l.663.157 4.285-.787c.544-1.05 1.275-1.574 2.194-1.574l.867.21c.612-.14.952-.21 1.02-.21.204 0 .578.14 1.123.42.544.245 1.07.332 1.58.262l1.94 1.574c.646.525 1.003 1.26 1.07 2.204-.577.7-1.088 1.05-1.53 1.05-.68 0-1.734-.158-3.163-.473-1.394-.314-2.448-.472-3.162-.472-3.163 0-5.119.228-5.867.682.34 1.4 1.922 3.586 4.744 6.56 1.735 1.889 4.439 4.145 8.111 6.769 4.014 2.938 6.768 5.107 8.265 6.506v1.102h-.357l-.204.105-.204.21.102.367h-.919c-.476.595-1.99.892-4.54.892-1.666 0-3.112-.542-4.336-1.626-.85-.735-1.735-1.854-2.653-3.359-1.428-2.343-2.193-3.585-2.295-3.725-1.53-1.82-3.707-4.67-6.53-8.553l-.46 1.521.256 1.47c0 .175-.051.454-.153.84-.068.35-.102.611-.102.786 0 1.715.136 2.781.408 3.201l-.408 1.942c.476 1.644.714 4.74.714 9.288 0 .174.017.454.05.84.069.384.103.681.103.891 0 1.994-.612 3.708-1.837 5.143l-.918-.105c-.816-.84-1.377-2.03-1.683-3.569-.272-1.329-.544-2.64-.817-3.935.579-1.294.868-2.799.868-4.513 0-.175.017-.437.05-.787.069-.385.103-.665.103-.84 0-2.098.017-4.197.05-6.296-.033-3.743-.203-5.825-.51-6.245a641.523 641.523 0 01-6.886 9.236c-2.755 3.533-5.68 5.93-8.775 7.189l-.714-.263c-1.496.14-2.296.21-2.398.21-.238 0-.595-.07-1.07-.21-.443-.175-.766-.262-.97-.262l-.97.21c3.231-1.714 6.802-4.443 10.714-8.186 4.047-3.918 6.818-7.451 8.315-10.6-1.837.07-3.996.77-6.479 2.1l-1.173 1.678c-.102.035-.187.035-.255 0l-1.684-.63c-.17-.699-.646-1.469-1.428-2.308-.748-.84-1.14-1.434-1.174-1.784l.51-1.732 2.5 1.05c2.653-.595 6.65-1.592 11.989-2.991.17-6.192.255-8.956.255-8.291 0-1.33-.868-2.414-2.602-3.254.306-.21.46-.49.46-.84l-.154-.157c1.088-.804 1.905-1.206 2.449-1.206l.459.052z"
          />
        </Svg>
      </View>
      <Text
        style={{
          marginLeft: 10,
          fontFamily: Fonts.regular,
          fontWeight: 'bold',
          fontSize: 16,
        }}>
        Woodcoin Wallet
      </Text>
      {isTestnet()}
    </View>
  );
};

function BottomTabs() {
  return (
    <SafeAreaView style={{
      flex:1,
      justifyContent:"flex-end",
    }}>
    <Tab.Navigator
      initialRouteName="Dashboard"
      //@ts-ignore
      sceneContainerStyle={{
        backgroundColor:"#cccccc00"
      }}
      screenOptions={({ route }) => ({
        tabBarShowLabel: false,
        tabBarActiveTintColor: '#FFFFFF',
        tabBarActiveBackgroundColor: '#e2e2e244',
        tabBarStyle: {
          borderTopWidth: 0,
          elevation: 0,
          height: Platform.OS === 'android' ? 55 : 60,
          marginTop: 3,
          paddingTop:16
        },
        tabBarItemStyle: {
          marginHorizontal: 20,
          borderRadius: 40,
          height:43,
          paddingVertical: 13,
          marginBottom: Platform.OS === 'android' && 5,
        },
        tabBarIcon: ({ focused }) => {
          if (route.name === 'Dashboard') {
            return focused ? (
              <Svg width="33" height="32" fill="none" viewBox="0 0 33 32">
                <Path
                  fill="#48C57D"
                  d="M27.167 6.333a1 1 0 100-2v2zm-19.334 0h19.334v-2H7.833v2zm0 6.667H18.5v-2H7.833v2zM5.5 8.667a2.333 2.333 0 012.333-2.334v-2A4.333 4.333 0 003.5 8.667h2zm-2 0A4.333 4.333 0 007.833 13v-2A2.333 2.333 0 015.5 8.667h-2z"
                />
                <Path fill="#48C57D" d="M5.5 16V8.667h-2V16h2z" />
                <Path
                  fill="#48C57D"
                  stroke="#48C57D"
                  d="M4 11.5h22.533c.443 0 .825 0 1.13.041.329.044.643.143.898.398s.354.57.398.897c.041.306.041.688.041 1.131V16.5h-4.5a3.5 3.5 0 100 7H29v2.533c0 .443 0 .825-.041 1.13-.044.329-.143.643-.398.898L4 11.5zm0 0v.5m0-.5v.5m0 0v14.033c0 .443 0 .825.041 1.13.044.329.144.643.398.898.255.255.57.354.897.398.306.041.688.041 1.131.041H26.5M4 12l22.5 16.5m0 0h.033m-.033 0h.033m0 0c.443 0 .825 0 1.13-.041m-1.13.041l1.13-.041m0 0c.329-.044.643-.143.898-.398l-.897.398z"
                />
              </Svg>
            ) : (
              <Svg width="33" height="32" fill="none" viewBox="0 0 33 32">
                <Path
                  fill="#70868F"
                  d="M27.167 6.333a1 1 0 100-2v2zm-19.334 0h19.334v-2H7.833v2zm0 6.667H18.5v-2H7.833v2zM5.5 8.667a2.333 2.333 0 012.333-2.334v-2A4.333 4.333 0 003.5 8.667h2zm-2 0A4.333 4.333 0 007.833 13v-2A2.333 2.333 0 015.5 8.667h-2z"
                />
                <Path fill="#70868F" d="M5.5 16V8.667h-2V16h2z" />
                <Path
                  fill="#70868F"
                  stroke="#70868F"
                  d="M4 11.5h22.533c.443 0 .825 0 1.13.041.329.044.643.143.898.398s.354.57.398.897c.041.306.041.688.041 1.131V16.5h-4.5a3.5 3.5 0 100 7H29v2.533c0 .443 0 .825-.041 1.13-.044.329-.143.643-.398.898L4 11.5zm0 0v.5m0-.5v.5m0 0v14.033c0 .443 0 .825.041 1.13.044.329.144.643.398.898.255.255.57.354.897.398.306.041.688.041 1.131.041H26.5M4 12l22.5 16.5m0 0h.033m-.033 0h.033m0 0c.443 0 .825 0 1.13-.041m-1.13.041l1.13-.041m0 0c.329-.044.643-.143.898-.398l-.897.398z"
                />
              </Svg>
            );
          } else if (route.name === 'PortfolioScreen') {
            return focused ? (
              //wallet ico
              <Svg 
              width={40}
              height={41}
              // style={{
              //   backgroundColor:"#e2e2e244",
              //   minWidth:70,
              //   borderRadius:21,
              //   overflow:"hidden"
              // }}
              fill="none" viewBox="0 0 30 31">
                <G>
                <Path
                  y={3}
                  d="M20.813 6.201a8.183 8.183 0 012.353 4.816h-7.183V3.875a8.183 8.183 0 014.83 2.326zm-6.296 14.132l.007-.15a8.183 8.183 0 01-.507-16.31v7.335a1.817 1.817 0 001.816 1.817h7.332a8.183 8.183 0 01-8.639 7.159l-.01.15zM15 1.85a10.15 10.15 0 100 20.3 10.15 10.15 0 000-20.3z"
                  fill="#45B68D"
                  stroke="#45B68D"
                  strokeWidth={0.3}
                />
                </G>
              </Svg>
            ) : (
              <Svg 
              width={40}
              height={41}
              fill="none" viewBox="0 0 30 31">
                <G>
                <Path
                  y={3}
                  d="M20.813 6.201a8.183 8.183 0 012.353 4.816h-7.183V3.875a8.183 8.183 0 014.83 2.326zm-6.296 14.132l.007-.15a8.183 8.183 0 01-.507-16.31v7.335a1.817 1.817 0 001.816 1.817h7.332a8.183 8.183 0 01-8.639 7.159l-.01.15zM15 1.85a10.15 10.15 0 100 20.3 10.15 10.15 0 000-20.3z"
                  fill="#444"
                  stroke="#45B68D00"
                  strokeWidth={0.3}
                />
                </G>
              </Svg>
            );
          } else if (route.name === 'SettingScreen') {
            return focused ? (
              <Svg width="27" height="28" fill="none"
               viewBox="0 0 27 28">
                <Path
                  fill="#48C57D"
                  fillRule="evenodd"
                  d="M16.348 2.482c.166 1.653.248 2.48.801 2.709.553.229 1.196-.297 2.482-1.35.673-.55 1.01-.826 1.394-.806.385.019.689.323 1.297.931l1.212 1.212c.608.608.912.912.931 1.297.02.385-.256.721-.806 1.394-1.053 1.286-1.579 1.93-1.35 2.482.23.553 1.056.635 2.71.8.865.087 1.297.13 1.556.416.258.286.258.716.258 1.576v1.714c0 .86 0 1.29-.258 1.576-.259.285-.691.329-1.557.415-1.653.166-2.48.248-2.708.8-.23.554.297 1.197 1.349 2.482.55.673.826 1.01.806 1.395-.019.384-.323.689-.931 1.297l-1.212 1.211c-.608.608-.912.913-1.297.932-.385.019-.721-.256-1.394-.807-1.286-1.052-1.93-1.578-2.482-1.35-.553.23-.635 1.056-.8 2.71-.087.865-.13 1.298-.416 1.557-.286.258-.716.258-1.576.258h-1.714c-.86 0-1.29 0-1.576-.258-.285-.259-.329-.691-.415-1.557-.165-1.653-.248-2.48-.801-2.709-.553-.229-1.196.297-2.482 1.35-.673.55-1.01.826-1.394.806-.385-.019-.69-.323-1.297-.931l-1.212-1.212c-.608-.608-.912-.912-.931-1.297-.02-.385.256-.721.806-1.394 1.053-1.286 1.579-1.93 1.35-2.482-.23-.553-1.056-.636-2.71-.8-.865-.087-1.297-.13-1.556-.416-.258-.286-.258-.716-.258-1.576v-1.714c0-.86 0-1.29.258-1.576.259-.285.692-.329 1.557-.415 1.653-.166 2.48-.248 2.71-.801.228-.553-.298-1.196-1.35-2.482-.551-.673-.827-1.01-.807-1.395.019-.385.323-.689.931-1.297l1.212-1.211c.608-.609.912-.913 1.297-.932.385-.02.721.256 1.395.807C8.655 4.893 9.298 5.419 9.85 5.19c.553-.229.636-1.055.8-2.708.087-.866.13-1.298.416-1.557.286-.258.716-.258 1.576-.258h1.714c.86 0 1.29 0 1.576.258.285.259.329.691.415 1.557zM13.5 19.333a5.333 5.333 0 100-10.666 5.333 5.333 0 000 10.666z"
                  clipRule="evenodd"
                />
              </Svg>
            ) : (
              <Svg width="27" height="28" fill="none" viewBox="0 0 27 28">
                <Path
                  fill="#70868F"
                  fillRule="evenodd"
                  d="M16.348 2.482c.166 1.653.248 2.48.801 2.709.553.229 1.196-.297 2.482-1.35.673-.55 1.01-.826 1.394-.806.385.019.689.323 1.297.931l1.212 1.212c.608.608.912.912.931 1.297.02.385-.256.721-.806 1.394-1.053 1.286-1.579 1.93-1.35 2.482.23.553 1.056.635 2.71.8.865.087 1.297.13 1.556.416.258.286.258.716.258 1.576v1.714c0 .86 0 1.29-.258 1.576-.259.285-.691.329-1.557.415-1.653.166-2.48.248-2.708.8-.23.554.297 1.197 1.349 2.482.55.673.826 1.01.806 1.395-.019.384-.323.689-.931 1.297l-1.212 1.211c-.608.608-.912.913-1.297.932-.385.019-.721-.256-1.394-.807-1.286-1.052-1.93-1.578-2.482-1.35-.553.23-.635 1.056-.8 2.71-.087.865-.13 1.298-.416 1.557-.286.258-.716.258-1.576.258h-1.714c-.86 0-1.29 0-1.576-.258-.285-.259-.329-.691-.415-1.557-.165-1.653-.248-2.48-.801-2.709-.553-.229-1.196.297-2.482 1.35-.673.55-1.01.826-1.394.806-.385-.019-.69-.323-1.297-.931l-1.212-1.212c-.608-.608-.912-.912-.931-1.297-.02-.385.256-.721.806-1.394 1.053-1.286 1.579-1.93 1.35-2.482-.23-.553-1.056-.636-2.71-.8-.865-.087-1.297-.13-1.556-.416-.258-.286-.258-.716-.258-1.576v-1.714c0-.86 0-1.29.258-1.576.259-.285.692-.329 1.557-.415 1.653-.166 2.48-.248 2.71-.801.228-.553-.298-1.196-1.35-2.482-.551-.673-.827-1.01-.807-1.395.019-.385.323-.689.931-1.297l1.212-1.211c.608-.609.912-.913 1.297-.932.385-.02.721.256 1.395.807C8.655 4.893 9.298 5.419 9.85 5.19c.553-.229.636-1.055.8-2.708.087-.866.13-1.298.416-1.557.286-.258.716-.258 1.576-.258h1.714c.86 0 1.29 0 1.576.258.285.259.329.691.415 1.557zM13.5 19.333a5.333 5.333 0 100-10.666 5.333 5.333 0 000 10.666z"
                  clipRule="evenodd"
                />
              </Svg>
            );
          }
          return null;
        },
      }) as any}>
      <Tab.Screen
        name="PortfolioScreen"
        component={PortfolioScreen}
        options={{
          // unmountOnBlur: true,
          headerShown: true,
          headerTitleAlign: 'left',
          headerTitle: () => null,
          headerStyle: {
            shadowColor: 'transparent', // ios
            elevation: 0, // android,
            height:15,
          },
          headerTintColor: Colors.foreground,
          headerTitleStyle: {
            fontWeight: 'bold',
            // marginVertical:20,
            fontFamily: Fonts.regular,
            fontSize: 19,
            justifyContent: 'center',
          },
        }}
      />
      <Tab.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{
          headerShown: false,
          headerTitleAlign: 'left',
          headerTitle: () => null,
          headerStyle: {
            shadowColor: 'transparent', // ios
            elevation: 0, // android,
            height:50,
            // backgroundColor: '#f5f1e4'
          },
          headerTintColor: Colors.foreground,
          headerTitleStyle: {
            fontWeight: 'bold',

            fontFamily: Fonts.regular,
            fontSize: 19,
            justifyContent: 'center',
          },
        }}
      />
      <Tab.Screen
        name="SettingScreen"
        component={SettingScreen}
        options={{
          headerShown: true,
          headerTitle: () => null,
          headerTitleAlign: 'left',
          headerStyle: {
            shadowColor: 'transparent', // ios
            elevation: 0, // android
            height:0
          },
          headerTintColor: Colors.foreground,
          headerTitleStyle: {
            fontWeight: 'bold',

            fontFamily: Fonts.regular,
            fontSize: 19,
            justifyContent: 'center',
          },
        }}
      />
    </Tab.Navigator>
    </SafeAreaView>
  );
}

function NavigationStack({ t }) {
  return (
    <Stack.Navigator
      screenOptions={{
        // headerStyleInterpolator: HeaderStyleInterpolators.forUIKit,
        cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
        // headerMode:"float"
      }}
    >
      <Stack.Screen
        name="SplashScreen"
        component={SplashScreen}
        options={styles.noAnim}
      />
      <Stack.Screen
        name="OnBoardingScreen"
        component={OnBoardingScreen}
        options={styles.noAnim}
      />
      <Stack.Screen
        name="StartScreen"
        component={StartScreen}
        options={styles.noAnim}
      />
      <Stack.Screen
        name="SetPinScreen"
        component={SetPinScreen}
        options={styles.noAnim}
      />
      <Stack.Screen
        name="ReEnterPinScreen"
        component={ReEnterPinScreen}
        options={{
          animationEnabled: false,
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="EnterPinScreen"
        component={EnterPinScreen}
        options={styles.noAnim}
      />
      <Stack.Screen
        name="GenerateWalletScreen"
        component={GenerateWalletScreen}
        options={{
          headerShown: false,
          title: '',
          headerStyle: {
            shadowColor: 'transparent', // ios
            elevation: 0, // android
            backgroundColor: 'transparent',
          },
          headerTintColor: Colors.foreground,
          headerBackTitleVisible: false,
          headerBackTitleStyle: {
            fontFamily: Fonts.regular,
          },
          headerTitleStyle: {
            fontWeight: 'bold',

            fontFamily: Fonts.regular,
            fontSize: 19,
            justifyContent: 'center',
          },
        }}
      />
      <Stack.Screen
        name="SearchScreen"
        component={SearchScreen}
        options={{
          headerShown: true,
          title: 'Back',
          headerStyle: {
            shadowColor: 'transparent', // ios
            elevation: 0, // android
            backgroundColor: 'transparent',
          },
          headerTintColor: Colors.foreground,
          headerBackTitleVisible: false,
          headerBackTitleStyle: {
            fontFamily: Fonts.regular,
          },
          headerTitleStyle: {
            fontWeight: 'bold',

            fontFamily: Fonts.regular,
            fontSize: 19,
            justifyContent: 'center',
          },
        }}
      />
      {/* <Stack.Screen
        name="SearchScreen"
        component={SearchScreen}
        options={{
          headerShown: false,
          animationEnabled: false,
        }}
      /> */}
      <Stack.Screen
        name="ValidateWalletScreen"
        component={ValidateWalletScreen}
        options={styles.importWallet}
      />
      <Stack.Screen
        name="ImportWalletScreen"
        component={ImportWalletScreen}
        options={styles.importWallet}
      />
      <Stack.Screen
        name="HomeScreens"
        component={BottomTabs}
        options={styles.noAnim}
      />
      <Stack.Screen
        name="WalletScreen"
        component={WalletScreen}
        options={styles.walletscreen}
      />
      <Stack.Screen
        name="WoodcoinWalletScreen"
        component={WoodcoinWalletScreen}
        options={styles.walletscreen}
      />
      <Stack.Screen
        name="NewsScreen"
        component={NewsScreen}
        options={{
          headerShown: true,
          headerTitle: t('title.news'),
          headerStyle: {
            backgroundColor: '#fff',
            shadowColor: 'transparent', // ios
            elevation: 0, // android
          },
          headerTintColor: Colors.foreground,
          headerBackTitleVisible: false,
          headerBackTitleStyle: {
            fontFamily: Fonts.regular,
          },
          headerTitleStyle: {
            fontWeight: 'bold',

            fontFamily: Fonts.regular,
            fontSize: 19,
            justifyContent: 'center',
          },
        }}
      />
      <Stack.Screen
        name="WalletconnectScreen"
        component={WalletconnectScreen}
        options={{
          presentation: 'modal',
          headerBackImage: () => (
            <Icon
              name="close"
              size={30}
              color={Colors.foreground}
              style={{ paddingLeft: 10 }}
            />
          ),
          headerShown: true,
          headerTitle: 'WalletConnect',
          headerStyle: {
            backgroundColor: '#fff',
            shadowColor: 'transparent', // ios
            elevation: 0, // android
          },
          headerTintColor: Colors.foreground,
          headerBackTitleVisible: false,
          headerBackTitleStyle: {
            fontFamily: Fonts.regular,
          },
          headerTitleStyle: {
            fontWeight: 'bold',

            fontFamily: Fonts.regular,
            fontSize: 19,
            justifyContent: 'center',
          },
        }}
      />
      <Stack.Screen
        name="LanguageScreen"
        component={LanguageScreen}
        options={{
          presentation: 'modal',
          headerBackImage: () => (
            <Icon
              name="close"
              size={30}
              color={Colors.foreground}
              style={{ paddingLeft: 10 }}
            />
          ),
          headerShown: true,
          headerTitle: 'Back',
          headerStyle: {
            backgroundColor: '#fff',
            shadowColor: 'transparent', // ios
            elevation: 0, // android
          },
          headerTintColor: Colors.foreground,
          headerBackTitleVisible: false,
          headerBackTitleStyle: {
            fontFamily: Fonts.regular,
          },
          headerTitleStyle: {
            fontWeight: 'bold',

            fontFamily: Fonts.regular,
            fontSize: 19,
            justifyContent: 'center',
          },
        }}
      />
      <Stack.Screen
        name="TokenConnectScreen"
        component={TokenConnectScreen}
        options={{
          presentation: 'modal',
          headerBackImage: () => (
            <Icon
              name="close"
              size={30}
              color={Colors.foreground}
              style={{ paddingLeft: 10 }}
            />
          ),
          headerShown: true,
          headerTitle: t('token_connect.title'),
          headerStyle: {
            backgroundColor: '#fff',
            shadowColor: 'transparent', // ios
            elevation: 0, // android
          },
          headerTintColor: Colors.foreground,
          headerBackTitleVisible: false,
          headerBackTitleStyle: {
            fontFamily: Fonts.regular,
          },
          headerTitleStyle: {
            fontWeight: 'bold',

            fontFamily: Fonts.regular,
            fontSize: 19,
            justifyContent: 'center',
          },
        }}
      />
      <Stack.Screen
        name="CustomTokenScreen"
        component={CustomTokenScreen}
        options={{
          presentation: 'modal',
          headerBackImage: () => (
            <Icon
              name="close"
              size={30}
              color={Colors.foreground}
              style={{ paddingLeft: 10 }}
            />
          ),
          headerShown: true,
          headerTitle: t('title.add_custom_token'),
          headerStyle: {
            backgroundColor: '#fff',
            shadowColor: 'transparent', // ios
            elevation: 0, // android
          },
          headerTintColor: Colors.foreground,
          headerBackTitleVisible: false,
          headerBackTitleStyle: {
            fontFamily: Fonts.regular,
          },
          headerTitleStyle: {
            fontWeight: 'bold',

            fontFamily: Fonts.regular,
            fontSize: 19,
            justifyContent: 'center',
          },
        }}
      />
      <Stack.Screen
        name="SwapScreen"
        component={SwapScreen}
        options={{
          // animationEnabled: Platform.OS === 'ios' ? true : false,
          headerShown: false,
          presentation: Platform.OS === 'ios' ? 'modal' : 'card',
        }}
      />
      <Stack.Screen
        name="NFTScreen"
        component={NFTScreen}
        options={{
          headerShown: false,
          presentation: 'modal',
          headerTitle: t('title.swap'),
          headerStyle: {
            backgroundColor: '#fff',
            shadowColor: 'transparent', // ios
            elevation: 0, // android
          },
          headerTintColor: Colors.foreground,
          headerBackTitleVisible: false,
          headerBackTitleStyle: {
            fontFamily: Fonts.regular,
          },
          headerTitleStyle: {
            fontWeight: 'bold',
            letterSpacing: 1,
            fontFamily: Fonts.regular,
            fontSize: 20,
            justifyContent: 'center',
          },
        }}
      />
      <Stack.Screen
        name="SettingScreen"
        component={SettingScreen}
        options={{
          headerShown: true,
          headerTitle: t('title.settings'),
          headerStyle: {
            backgroundColor: '#fff',
            shadowColor: 'transparent', // ios
            elevation: 0, // android
          },
          headerTintColor: Colors.foreground,
          headerBackTitleVisible: false,
          headerBackTitleStyle: {
            fontFamily: Fonts.regular,
          },
          headerTitleStyle: {
            fontWeight: 'bold',

            fontFamily: Fonts.regular,
            fontSize: 19,
            justifyContent: 'center',
          },
        }}
      />
      <Stack.Screen
        name="CoinDetailScreen"
        component={CoinDetailScreen}
        options={{
          headerShown: true,
          headerTitle: 'Back',
          /* headerBackImage: () => (
            <Icon2
              name="arrow-left"
              size={30}
              color={Colors.foreground}
              style={{paddingLeft: 10}}
            />
          ), */
          headerStyle: {
            backgroundColor: '#fff',
            shadowColor: 'transparent', // ios
            elevation: 0, // android
          },
          headerTintColor: Colors.foreground,
          headerBackTitleVisible: false,
          headerBackTitleStyle: {
            fontFamily: Fonts.regular,
          },
          headerTitleStyle: {
            fontWeight: 'bold',

            fontFamily: Fonts.regular,
            fontSize: 19,
            justifyContent: 'center',
          },
        }}
      />
      <Stack.Screen
        name="MarketScreen"
        component={MarketScreen}
        options={{
          headerShown: true,
          headerTitle: t('market.market'),
          headerStyle: {
            backgroundColor: '#fff',
            shadowColor: 'transparent', // ios
            elevation: 0, // android
          },
          headerTintColor: Colors.foreground,
          headerBackTitleVisible: false,
          headerBackTitleStyle: {
            fontFamily: Fonts.regular,
          },
          headerTitleStyle: {
            fontWeight: 'bold',

            fontFamily: Fonts.regular,
            fontSize: 19,
            justifyContent: 'center',
          },
        }}
      />
      <Stack.Screen
        name="SendReceiveScreen"
        component={SendReceiveScreen}
        options={{
          presentation: 'modal',
          headerShown: true,
          title: '',
          headerBackImage: () => (
            <Icon
              name="close"
              size={30}
              color={Colors.foreground}
              style={{ paddingLeft: 10 }}
            />
          ),
          headerBackTitleVisible: false,
          headerTitleAlign: 'center',
          headerStyle: {
            shadowColor: 'transparent', // ios
            elevation: 0, // android
          },
          headerTintColor: Colors.foreground,
          headerBackTitleStyle: {
            fontFamily: Fonts.regular,
          },
          headerTitleStyle: {
            fontWeight: 'bold',

            fontFamily: Fonts.regular,
            fontSize: 19,
            justifyContent: 'center',
          },
        }}
      />
      <Stack.Screen
        name="SendReceiveScreenLog"
        component={SendReceiveScreenLog}
        options={{
          presentation: 'modal',
          headerShown: true,
          title: '',
          headerBackImage: () => (
            <Icon
              name="close"
              size={30}
              color={Colors.foreground}
              style={{ paddingLeft: 10 }}
            />
          ),
          headerBackTitleVisible: false,
          headerTitleAlign: 'center',
          headerStyle: {
            shadowColor: 'transparent', // ios
            elevation: 0, // android
          },
          headerTintColor: Colors.foreground,
          headerBackTitleStyle: {
            fontFamily: Fonts.regular,
          },
          headerTitleStyle: {
            fontWeight: 'bold',

            fontFamily: Fonts.regular,
            fontSize: 19,
            justifyContent: 'center',
          },
        }}
      />
    </Stack.Navigator>
  );
}
export const NavigationScreens = withTranslation()(NavigationStack);
