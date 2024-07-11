// Define crypto.getRandomValues before loading other libraries

const bip32 = require('bip32');
const bip39 = require('bip39');
const bitcoin = require('bitcoinjs-lib');

// define network
// bitcoin - mainnet
// testnet - testnet
const network = bitcoin.networks.testnet;

// address wallet HD
const path = `m/49'/1'/0'/0`;

// create mnemonic to seed (password)
let mnemonic = bip39.generateMnemonic();
const seed = bip39.mnemonicToSeedSync(mnemonic);

// create root wallet HD
let root = bip32.fromSeed(seed, network);

// create account - pair of private-public keys
let account = root.derivePath(path);
let node = account.derive(0).derive(0);

let btcAddress = bitcoin.payments.p2pkh({
    pubkey: node.publicKey,
    network: network,
}).address;

console.log("Generate Wallet");
console.log("Address:", btcAddress);
console.log("Private Key:", node.toWIF());
console.log("Seed:", mnemonic);
