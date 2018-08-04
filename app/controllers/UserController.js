var User = require('../models/user');

var flashOption = {
    position:"b",
    duration:"5000"
  };

var userController = {};

userController.list = (req, res) => {
    User.find({}).exec((err, users) => {
      if (err) {
        console.log("Error:", err);
      }
      else {

        res.render("../views/user/list", {users: users});
      }
    });
  };

  userController.save = (req, res) => {

    if(req.body.first_name=='' && req.body.email==''){
        res.flash('First Name and Email are required!', 'error',flashOption);
        res.redirect('/register');
    }else if(req.body.password.length<6){
        res.flash('Password should be more than 6 letters.', 'error', flashOption);
        res.redirect('/register');
    }else{
        User.findOne({'local.email':req.body.email},(err, usr)=>{
            if(err) {
                res.flash('Some Error Occure!', 'error',flashOption);
                res.redirect('/register');
            } else {
                if(usr){
                    res.flash(req.body.email+' already taken!', 'warn',flashOption);
                    res.redirect('/register');
                }else{
                  user = new User();
                  user.local.email = req.body.email;
                  user.local.password = user.generateHash(req.body.password);
  
                  user.local.first_name = req.body.first_name;
                  user.local.last_name = req.body.last_name;
                  user.local.gender = req.body.gender;
                  user.local.address1 = req.body.address1;
                  user.local.address2 = req.body.address2;
                  user.local.address = req.body.address;
                  user.local.city = req.body.city;
                  user.local.zip = req.body.zip;

                  user.save((err,usr)=>{
                    if(err){
                        res.flash('Some Error Occure while Registering user.',flashOption);
                        res.redirect('/register');
                    }else{
                        req.session.user = usr;
                        res.flash('User Registered successfully.',flashOption);
                        res.redirect('/get-xbn');
                        }
                        
                    });
                }
                
            }});
    }   
  };

  userController.update = (req, res) => {
    var sslocal = req.session.user.local
    //   var ssuser=req.session.user;;
    //   local = ssuser;
    //   ssuser.local.first_name = req.body.first_name;

    // delete sslocal['email'];
    // delete sslocal['pasword'];
    // delete sslocal['updated_at'];

    sslocal.first_name = req.body.first_name;
    sslocal.last_name = req.body.last_name;
    sslocal.gender = req.body.gender;
    sslocal.address1 = req.body.address1;
    sslocal.address2 = req.body.address2;
    sslocal.address = req.body.address;
    sslocal.city = req.body.city;
    sslocal.zip = req.body.zip;


    User.findByIdAndUpdate(req.body.id, { $set: {local: sslocal}}, { new: true }, function (err, employee) {
    if (err) {
      res.flash('Some Error Occure!', 'error',flashOption);
      res.redirect('/profile');
    }
    res.flash('Data Updated.', flashOption);
    // req.session.user = usr;
    res.redirect('/profile');
  });
};

  module.exports = userController;