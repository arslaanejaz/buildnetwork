// Allows us to use ES6 in our migrations and tests.
require('babel-register')

module.exports = {
  networks: {
    development: {
      host: '127.0.0.1',
      port: 8545,
      network_id: '*'
    },
    main: {
      provider: () => new HDWalletProvider(process.env.MNENOMIC, "https://mainnet.infura.io/v3/e3eac9aa73e74660923fa7cf147f2621"),
      network_id: 1,
      gas: 3000000,
      gasPrice: 21
    }
  }
}
