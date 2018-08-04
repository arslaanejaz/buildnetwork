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


    userController.update = (req, res) => {
        Employee.findByIdAndUpdate(req.params.id, { $set: { name: req.body.name, address: req.body.address, position: req.body.position, salary: req.body.salary }}, { new: true }, function (err, employee) {
        if (err) {
          res.flash('Some Error Occure!', 'error',flashOption);
          res.redirect('/profile');
        }
        res.flash('Data Updated.', flashOption);
        res.redirect('/profile');
      });
    };

    
  };

  module.exports = userController;