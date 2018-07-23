var express = require('express');
var router = express.Router();
var User = require('../models/user');
var auth = require('../middleware/auth');
var flashOption = {
    position:"b",
    duration:"5000"
  };

const truffle_connect = require('../../connection/app.js');

router.get('/get-xbn', (req, res, next)=>{

    res.render('user/purchase-xbn',{
        page: 'xbn-tokens',
    });

    // res.render('user/purchase-xbn',{
    //     page: 'xbn-tokens',
    // });

    // let account = truffle_connect.web3.eth.accounts[0];
    // truffle_connect.getTokens("0xdd5cb03fd29f1aa2efe6d6b67066f815c6a56120", (balance) => {
    //     balance = truffle_connect.web3.fromWei(balance, "ether" );

    //     res.render('user/purchase-xbn',{
    //         page: '',
    //         balance: balance
    //     });
    // });

});

router.get('/members', (req, res, next)=>{

    res.render('user/members',{
        page: 'members',
    });
});

router.post('/pay',(req, res, next)=>{
    let account = req.body.account 
    //truffle_connect.web3.eth.accounts[0];
    console.log(req.body.amount);
    truffle_connect.sendTransaction(account, req.body.amount, ()=>{
        res.redirect('/get-xbn');
    });
});


module.exports = router;    