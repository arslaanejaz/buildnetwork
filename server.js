const express = require('express');
const app = express();
const port = 3000 || process.env.PORT;
// const Web3 = require('web3');
// const truffle_connect = require('./connection/app.js');
const bodyParser = require('body-parser');
const path = require('path');

//session
const configSession = require('./app/config/session');
var session = require('express-session');
app.use(session({ secret: configSession.secret, resave: true, saveUninitialized: true }));

// parse application/json
app.use(bodyParser.json());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

const configDB = require('./app/config/database');
const mongoose = require('mongoose');
mongoose.connect(configDB.url);


//controller
const indexRouter = require('./app/routes/index');
const staticRouter = require('./app/routes/static');
//home route
app.use('/', indexRouter);
app.use('/', staticRouter);

// view engine setup
var hbs = require('hbs');
var fs = require('fs');
hbs.registerPartial('navPartial', fs.readFileSync(__dirname + '/app/views/include/nav.hbs', 'utf8'));

require('./app/models/hbsHelper').register(hbs);

// hbs.registerPartials(__dirname + '/views/include/nav');
 
app.set('views', path.join(__dirname, 'app/views'));
app.set('view engine', 'hbs');
app.set('view options', { layout: 'layout/main' });




//mongoose
// const Cat = mongoose.model('Cat', { name: String });
// const kitty = new Cat({ name: 'Zildjiannd' });
// kitty.save().then(() => console.log('meow'));
//mongoose

app.use('/', express.static('public_static'));

// app.get('/getAccounts', (req, res) => {
//   console.log("**** GET /getAccounts ****");
//   truffle_connect.start(function (answer) {
//     res.send(answer);
//   })
// });

// app.post('/getBalance', (req, res) => {
//   console.log("**** GET /getBalance ****");
//   console.log(req.body);
//   let currentAcount = req.body.account;

//   truffle_connect.refreshBalance(currentAcount, (answer) => {
//     let account_balance = answer;
//     truffle_connect.start(function(answer){
//       // get list of all accounts and send it along with the response
//       let all_accounts = answer;
//       response = [account_balance, all_accounts]
//       res.send(response);
//     });
//   });
// });

// app.post('/sendCoin', (req, res) => {
//   console.log("**** GET /sendCoin ****");
//   console.log(req.body);

//   let amount = req.body.amount;
//   let sender = req.body.sender;
//   let receiver = req.body.receiver;

//   truffle_connect.sendCoin(amount, sender, receiver, (balance) => {
//     res.send(balance);
//   });
// }); 




app.listen(port, () => {

  // if (typeof web3 !== 'undefined') {
    // console.warn("Using web3 detected from external source. If you find that your accounts don't appear or you have 0 MetaCoin, ensure you've configured that source properly. If using MetaMask, see the following link. Feel free to delete this warning. :) http://truffleframework.com/tutorials/truffle-and-metamask")
    // Use Mist/MetaMask's provider
    // truffle_connect.web3 = new Web3(web3.currentProvider);
  // } else {
    // console.warn("No web3 detected. Falling back to http://127.0.0.1:7545. You should remove this fallback when you deploy live, as it's inherently insecure. Consider switching to Metamask for development. More info here: http://truffleframework.com/tutorials/truffle-and-metamask");
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    
    // truffle_connect.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));
    
    
  // }
  console.log("Express Listening at http://localhost:" + port);

});
