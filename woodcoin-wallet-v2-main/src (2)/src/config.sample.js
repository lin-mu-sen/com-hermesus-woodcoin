// import {LogBox} from 'react-native';

const CONFIG = {};

process.env.TESTNET = false;

// LogBox.ignoreLogs(['Easing']);

CONFIG.APP_VERSION = '1.3.7 (50)';
CONFIG.BUILD_NUMBER = 50;
CONFIG.API = "https://slack.woodcoin.ru"
CONFIG.TESTNET = process.env.TESTNET;
CONFIG.COINGRIG_KEY = 'KtSelR6q7lMSfpGhgF2Fmpe5zfMZV7Ae';
CONFIG.DEFAULT_DERIVATION_KEY = 5;
CONFIG.PIN_ANDROID_TIMEOUT = 180; // seconds
CONFIG.BALANCE_TIMEOUT = 10; // seconds
CONFIG.NEW_ASSET_DESCRIPTOR_VERSION = 1;
CONFIG.COVALENT_KEY = 'ckey_b681ea7a1d364654b5b0cc01bb3';
CONFIG.OPENSEA_KEY = 'KtSelR6q7lMSfpGhgF2Fmpe5zfMZV7Ae';
CONFIG.MIGRATION_KEY = '@MIGRATION_KEY';
CONFIG.INIT_KEY = '@init';
CONFIG.ONESIGNAL_KEY = '37a769b5-872d-4b59-a12a-e62c17e5092d';
CONFIG.SWAP_FEE = 0; // 0%
CONFIG.FEE_RECIPIENT = '0';
// CONFIG.testNFTs = '';

export default CONFIG;