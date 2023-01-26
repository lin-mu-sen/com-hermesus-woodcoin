////
////  SVPModule.m
////  woodcoin
////
////  Created by @km8oz  on 3/12/22.
////
////#import <Foundation/Foundation.h>
//#import "SVPModule.h"
//@implementation RNSPVModule
//
//RCT_EXPORT_MODULE();
//RCT_EXPORT_METHOD(createwallet:
//                  (RCTPromiseResolveBlock)resolve rejecter
//                  : (RCTPromiseRejectBlock)reject)
//{
//  WSSeed *seed = [[WSSeedGenerator sharedInstance] generateRandomSeed];
////  WSSeed *seed = [[WSSeed alloc] init];
////  seed = [seed initWithMnemonic:options[@"mnemonic"] creationTime:[[NSDate date] timeIntervalSince1970]];
//  // now's the time to backup the seed somewhere, show it to the user etc
//  WSParametersBuilder *builder = [[WSParametersBuilder alloc] initWithNetworkType:WSNetworkTypeMain];
//[builder setGenesisBits:0x223232];
//[builder setGenesisNonce:0x1591189];
//[builder setGenesisTimestamp:1413817324];
//[builder setGenesisVersion:1];
//[builder setDnsSeeds:@[ @"dnsseed.woodcoin.org",
//                           @"woodcoin.org",
////                             @"dnsseed.ltc.xurious.com",
////                             @"dnsseed.koin-project.com",
////                             @"dnsseed.weminemnc.com",
////                             @"seed-a.woodcoin.loshan.co.uk",
////                             @"slack.woodcoin.ru/ws"
//                        ]];
//[builder setPeerPort:8338];
//[builder setGenesisMerkleRoot:WSHash256FromHex(@"30758383eae55ae5c7752b73388c1c85bdfbe930ad25ad877252841ed1e734a4")];
//builder.scriptAddressVersion        = 0x05;
//[builder setPrivateKeyVersion:0x74];
//[builder setPublicKeyAddressVersion:0x73];
//builder.retargetTimespan            = 2 * WSDatesOneWeek;   // the targeted timespan between difficulty target adjustments
//builder.minRetargetTimespan         = builder.retargetTimespan / 4;
//builder.maxRetargetTimespan         = builder.retargetTimespan * 4;
//builder.retargetSpacing             = 10 * WSDatesOneMinute;
//builder.retargetInterval            = builder.retargetTimespan / builder.retargetSpacing; // 2016
//
//builder.genesisVersion              = 1;
//  builder.checkpointsHex = @"010000002f82b87670845faadde3fedd0dbf5040db62ba2b25c23e2c8408c17400000000ed73df5023c8e8f477fb965fe4c3cbfe5ee34b7d8b56c3efa3f3f9c0b275c91318526a4affff001dd953970400c04e0000064ec14ec14ec1010000001a231097b6ab6279c80f24674a2c8ee5b9a848e1d45715ad89b6358100000000a822bafe6ed8600e3ffce6d61d10df1927eafe9bbf677cb44c4d209f143c6ba8db8c784b5746651cce22211800809d000006aa83470b022201000000934c2bd5a456180b404341a380d20f51d0862b38311deb4d9505450900000000299a1702e49cf69bc3d0a6eee27510cc3cca5a427e1d000b2ccaf907116aaf4822c6124c64ba0e1c5423c2040040ec000007033108918048f5010000000e860de65c35a94d2e335be7d79aabb6e3ddf3918e6d65c61e5b230000000000e36abc2127229d3a94ae0e2067a0a75cab61629d5b2f01b927df43b6c0025a08976f954ced66471bfb11bb0300003b010007573c8422533f6201000000ddf75090bebe04fd00bd5d54945a7e775ff21a012374e284fe5a0200000000007a71100da32b454f15e1863b6dda148c830f92c0e99806c10f69ac6392ea3cb9335a214dcb04041b24da04f800c08901000806f5a2514ecc5ae0010000003d03ef67e92310f1f1161fcf6e3631bcd25a93e5e422b5ac84a30000000000007096173096e73db173c4b21ae76bbbbf655ebb5bd9662e91da721144c54eeada8c79bb4dfa98001b5898b8540080d8010008426823e1d78011b6010000000a5d88ccd0c56b9bbe4c84acae7250a2d4dc5ba92f52783dd3070000000000002c92030e6281be57bec776b084dc316febfcb2487ab96ec71708af36531955e976af494e864a091a1dda09ed004027020009047170e1c12bfa4b3001000000c48381c43b1d2ebd386c70971289aa69e974ff281fedd27f1b03000000000000fcec0145025b8ac811b486fc91f07f5a39a2170c2eee1066238dda4545af70b6c8df094fd7690d1a350999b50000760200090b2788722844ce4bff01000000b807c2dec8b735f71bba13196f69dc26d2c75ea831862bd7b4040000000000009061c7196a009b9616b0cbc1a93e70c6334e1bd6efe27908850ab034c659fef29579be4f5f8b0a1a225d77a700c0c40200091214b3a76adad52bb6010000009d6f4e09d579c93015a83e9081fee83a5c8b1ba3c86516b61f0400000000000025399317bb5c7c4daefe8fe2c4dfac0cea7e4e85913cd667030377240cadfe93a4906b50087e051a84297df70080130300091bd19c9ad8596dd8d001000000747ccc507cb0be8b458daaaf94c168f48a555fda0995a84cb3030000000000001460f2f1855d75fc1be8aaf21b58b004fecaae04ffc681b9c6cfda641f6221d7367a21515c98041a236d0dff0040620300092ae0d85d5ef4c3f67802000000410abeabf007c1247961d2acd133393fafea89af19ee6fb6d90000000000000037eb13c117f5099289a43abbd5a173fef04047db980c0cb84c6a1930f3b9c6141e30be5115de001a8c1431ed0000b103000952e3b250dd8600d6ed02000000c1ff84e95f9a73d760b37e444056b74867fcd8a382e13cc110000000000000003998741bf1f6806b26bc8496f4efbccd52ca36b27b827c2dfb6f1f055e72c3a4d8765152cab016191b45807600c0ff03000a016cc42d7fd00b16f45102000000e03f401bd7d2484a323ecd4b6bf9945a1a35de61a442355102000000000000003eb2df22382e43f5b527c0a6b8b230bccb93947043b7f9357ad3f6591f2897498e6ae2522cf50119a2ca673500804e04000a100bbd541d5a61923e1d020000006653331789442da38ff405a9f3807c7d3407a7e085b5e90e0000000000000000c5652bd21f27a0873515c5a538fc741ee61201d72413c1856e0986707ce3604dee798053422869186bda24f300409d04000a6d82e3c93a69c3f49d40020000000f6af938320a7efb354df9da98f3e5c0a1de0715a2d107160000000000000000baba50a2116b65022b437a9c912c83d18c39a161d88d5d261011413c79570b735087245493b81f1869e5702b0000ec04000b01c8cf1d42683da610ee6002000000dc0ae15cad873162f27db2ff33d9fbe2193aa492e1e9d1050000000000000000339167c2bdf04f5aa7aa56b1ab8925619e7d851e2586d771c519402c640ed5e7dfd4d85487bb1818649c7a5200c03a05000b0495913a4601568a789d0902000000063c2ef9016bf32a904eead62a7cc120cffa3cf243197206000000000000000018b6461deb0d4d9fc9c663a101474332aeaaf7750cc7b003fb71e0494e503d8c2e9d8f558e41161826b07eda00808905000b07fe7cdecae05f1402ff94";
//[builder setBip32PublicKeyVersion:0x0488b21e];
//[builder setBip32PrivateKeyVersion:0x0488ade4];
//WSParameters *parameters = [builder build];
//NSAssert([parameters.genesisBlockId isEqual:WSHash256FromHex(@"30758383eae55ae5c7752b73388c1c85bdfbe930ad25ad877252841ed1e734a4")],
//         @"Bad genesis block id (main)");
//  id<WSBlockStore> store = [[WSMemoryBlockStore alloc] initWithParameters:parameters];
//  WSHDWallet *wallet = [[WSHDWallet alloc] initWithParameters:parameters seed:seed];
//  WSBlockChainDownloader *downloader = [[WSBlockChainDownloader alloc] initWithStore:store wallet:wallet];
//  
//  WSPeerGroup *peerGroup = [[WSPeerGroup alloc] initWithParameters:parameters];
//  [peerGroup startConnections];
//  [peerGroup startDownloadWithDownloader:downloader];
//  self.listpeers = peerGroup;
//  // strongly retain peer group
////  WSAddress *nsres = [wallet changeAddress];
//  NSString *isProxy = [peerGroup isProxy] ? @"true" : @"false";
//  NSString *isSynced = [peerGroup isSynced] ? @"true" : @"false";
//  NSString *isConnected = [peerGroup isConnected] ? @"true" : @"false";
//  NSString *isDownloading = [peerGroup isDownloading] ? @"true" : @"false";
//  id objects[] = { isProxy, isSynced, isConnected, isDownloading };
//  id keys[] = { @"isProxy", @"isSynced", @"isConnected", @"isDownloading" };
//  NSUInteger count = sizeof(objects) / sizeof(id);
//  NSDictionary *STATUS = [NSDictionary dictionaryWithObjects:objects
//                                                         forKeys:keys
//                                                           count:count];
//
//  resolve(STATUS);
//}
//RCT_EXPORT_METHOD(getstatus:(RCTPromiseResolveBlock)resolve rejecter
//                  : (RCTPromiseRejectBlock)reject){
//  NSString *isProxy = [self.listpeers isProxy] ? @"true" : @"false";
//  NSString *isSynced = [self.listpeers isSynced] ? @"true" : @"false";
//  NSString *isConnected = [self.listpeers isConnected] ? @"true" : @"false";
//  NSString *isDownloading = [self.listpeers isDownloading] ? @"true" : @"false";
//  NSArray *list = [self.listpeers peerHosts] ? [self.listpeers peerHosts] : @[];
//  id objects[] = { isProxy, isSynced, isConnected, isDownloading, list };
//  id keys[] = { @"isProxy", @"isSynced", @"isConnected", @"isDownloading", @"peers" };
//  NSUInteger count = sizeof(objects) / sizeof(id);
//  NSDictionary *STATUS = [NSDictionary dictionaryWithObjects:objects
//                                                         forKeys:keys
//                                                           count:count];
//  resolve(STATUS);
//}
////+ (BOOL)requiresMainQueueSetup{
////  return true;
////}
//
//@end
