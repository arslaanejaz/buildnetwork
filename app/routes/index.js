var express = require('express');
var router = express.Router();  
// var mongoose = require('mongoose');
var User = require('../models/user');
var auth = require('../middleware/auth');

router.get('/register', (req, res, next) => {
    res.render('user/register',{
        page: 'register'
    });
})

router.get('/', (req, res, next) => {
    // console.log (truffle_connect.web3.eth.accounts);
    res.render('index',{
        page: ''
    });
});


router.get('/sign-up', (req, res, next) => {
    // console.log (truffle_connect.web3.eth.accounts);
    if (req.session.user) {
        res.redirect('/profile');
      }else{
        res.render('user/sign-up',{
            title: 'Build Networks'
        });
      }
    
});

router.post('/sign-up', (req, res, next) => {
    // console.log (truffle_connect.web3.eth.accounts);
    user = new User();
    user.local.email = req.body.email;
    user.local.password = user.generateHash(req.body.password);

    user.save((err,usr)=>{
        if(err)
        res.send('Some Error Occure!');
        else{
            req.session.user = usr;
            res.redirect('/register');
        }
        
    });
});

router.post('/login', (req, res, next) => {

    let result = User.findOne({'local.email':req.body.email},(err, usr)=>{if(err) {console.log('user found error!')} else {
            if(usr.validPassword(req.body.password)){
                req.session.regenerate(() => {
                    req.session.user = usr;
                    res.redirect('/profile');
                  });
            }else{
                res.send('password not match!');
            }
        }});
    // console.log(result);
        
    });

// router.post('/login', async(req, res, next) => {

//     let result = await User.findOne({'local.email':req.body.email},(err, usr)=>{if(err) {console.log('user found error!')} else {
//             if(usr.validPassword(req.body.password)){
//                 req.session.regenerate(() => {
//                     req.session.user = usr;
//                     // res.redirect('/profile');
//                     return '/profile';
//                     });
//             }else{
//                 // res.send('password not match!');
//                 return 'else';
//             }
//         }});
//     console.log(result);
//         // result.then(s => { console.log(s)})
        
//     });

router.get('/profile', auth, (req, res, next)=>{
    res.render('static/welcome',{
        page: ''
    });
});

router.get('/logout', function(req, res) {
    req.session.destroy((err)=>{
    if(err){
        res.send('some error occure');
    }else{
        res.redirect('/');
    }
    })
    
  });

module.exports = router;    