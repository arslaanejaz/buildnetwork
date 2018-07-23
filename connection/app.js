const contract = require('truffle-contract');

const token_artifact = require('../build/contracts/Token.json');
const sale_artifact = require('../build/contracts/Sale.json');

var Token = contract(token_artifact);
var Sale = contract(sale_artifact);

module.exports = {
  start: function(callback) {
    var self = this;
    // Get the initial account balance so it can be displayed.
    // console.log(self.web3.eth.accounts)
    self.web3.eth.getAccounts(function(err, accs) {
      if (err != null) {
        console.log(err);
        console.log("There was an error fetching your accounts.");
        return;
      }

      if (accs.length == 0) {
        console.log("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
        return;
      }
      self.accounts = accs;
      self.account = self.accounts[0];
      console.log(self.account)

      callback(self.accounts);
    });
  },
  setupCoin: function() {
    var self = this;

    // Bootstrap the MetaCoin abstraction for Use.
    Sale.setProvider(self.web3.currentProvider)

    var meta;
    Sale.deployed().then(function(instance) {
      meta = instance;
      return meta.setup("0x7adf0a1802b2dcdc5db83e8031a63dcacef9a109",7000000, {from: self.account});
    }).then(function() {
      console.log("one time start...")
    }).catch(function(e) {
      console.log(e);
      callback("ERROR 404");
    });
  },
  getTokens: function(account, callback) {
    var self = this;

    // Bootstrap the MetaCoin abstraction for Use.
    Token.setProvider(self.web3.currentProvider);
    console.log(self.web3);
    

    var meta;
    Token.deployed().then(function(instance) {
      meta = instance;
      console.log(account);
      return meta.balanceOf(account);
    }).then(function(value) {
        callback(value.valueOf());
    }).catch(function(e) {
        console.log(e);
        callback("Error 404");
    });
  },
  sendTransaction: function(account, amount,callback){
    var self = this;
    self.web3.eth.sendTransaction({
      from:account, 
      to:"0x7bfa11aa43833f8b980803bea180c54b82cacb2d", 
      value: self.web3.toWei(amount, "ether")},
      function(){
        callback('done');
      });
      
  },
  sendCoin: function(amount, sender, receiver, callback) {
    var self = this;

    // Bootstrap the MetaCoin abstraction for Use.
    Sale.setProvider(self.web3.currentProvider);

    var meta;
    Sale.deployed().then(function(instance) {
      meta = instance;
      return meta.sendCoin(receiver, amount, {from: sender});
    }).then(function() {
      self.refreshBalance(sender, function (answer) {
        callback(answer);
      });
    }).catch(function(e) {
      console.log(e);
      callback("ERROR 404");
    });
  }
}
