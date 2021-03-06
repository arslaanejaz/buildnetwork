var express = require('express');
var router = express.Router();  
// var mongoose = require('mongoose');
var User = require('../models/user');
var auth = require('../middleware/auth');
var userController = require('../controllers/UserController')

var flashOption = {
    position:"b",
    duration:"5000"
  };

//   router.get('/list', userController.list);

router.get('/register', (req, res, next) => {
    if(req.session.user) 
    res.redirect('/get-xbn');
    else
    res.render('user/register',{
        page: 'register'
    });
})

router.get('/sign-in', (req, res, next) => {
    if(req.session.user) 
    res.redirect('/get-xbn');
    else
    res.render('user/sign-in',{
        page: 'sign-in'
    });
})

router.get('/', (req, res, next) => {
    res.render('index',{
        page: ''
    });
});


// router.get('/sign-up', (req, res, next) => {
//     if (req.session.user) {
//         res.redirect('/member');
//       }else{
//         res.render('user/sign-up',{
//             title: 'Build Networks'
//         });
//       }
// });

router.get('/profile', auth, (req, res, next) => {
    res.render('user/profile',{
        page: 'profile'
    });
});

router.post('/profile-update', userController.update)
// router.post('/profile-update', auth, (req, res, next) => {
//     if(req.body.first_name==''){
//         res.flash('First Name is required!', 'error',flashOption);
//         res.redirect('/register');
//     }else{
//         res.flash('Data Updated successfully.',flashOption);
//         res.redirect('/profile');
//         // user = new User();
//         // user.local.first_name = req.body.first_name;
//         // user.local.last_name = req.body.last_name;
//         // user.local.gender = req.body.gender;
//         // user.local.address1 = req.body.address1;
//         // user.local.address2 = req.body.address2;
//         // user.local.city = req.body.city;
//         // user.local.zip = req.body.zip;

//         // user.update({email:'arslaanejaz@gmail.com'}, user, (err,usr)=>{
//         //     if(err){
//         //         res.flash('Some Error Occure while Registering user.',flashOption);
//         //         res.redirect('/profile');
//         //     }else{
//         //         req.session.user = usr;
//         //         res.flash('Data Updated successfully.',flashOption);
//         //         res.redirect('/profile');
//         //         }
                
//         //     });
//     }

   
// });

router.post('/sign-up', userController.save)
// router.post('/sign-up', (req, res, next) => {
//     if(req.body.first_name=='' && req.body.email==''){
//         res.flash('First Name and Email are required!', 'error',flashOption);
//         res.redirect('/register');
//     }else if(req.body.password.length<6){
//         res.flash('Password should be more than 6 letters.', 'error', flashOption);
//         res.redirect('/register');
//     }else{
//         User.findOne({'local.email':req.body.email},(err, usr)=>{
//             if(err) {
//                 res.flash('Some Error Occure!', 'error',flashOption);
//                 res.redirect('/register');
//             } else {
//                 if(usr){
//                     res.flash(req.body.email+' already taken!', 'warn',flashOption);
//                     res.redirect('/register');
//                 }else{
//                     userController.save
//                 }
                
//             }});
//     }

   
// });

router.post('/sign-in', (req, res, next) => {
    
    User.findOne({'local.email':req.body.email},(err, usr)=>{if(err) {console.log('user found error!')} else {
        if(usr){
            if(usr.validPassword(req.body.password)){
                req.session.regenerate(() => {
                    req.session.user = usr;
                    // res.locals.user = usr;
                    res.redirect('/get-xbn');
                  });
            }else{
                res.flash('Password not match!','error',flashOption);
                res.redirect('/sign-in');
            }
        }else{
            res.flash('Worong User Name','error',flashOption);
            res.redirect('/sign-in');
        }  
            
        }});
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

//router.get('/member', auth, (req, res, next)=>{

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