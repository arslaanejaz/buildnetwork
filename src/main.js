
import { default as Web3} from 'web3';


var accounts;
var account;
var xbnrate = 53689;
var ethrate = 0.51;

window.App = {
  start: function() {
    // Get the initial account balance so it can be displayed.
    web3.eth.getAccounts(function(err, accs) {
      if (err != null) {
        alert("There was an error fetching your account.");
        return;
      }

      if (accs.length == 0) {
        alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
        return;
      }

      accounts = accs;
      console.log(accounts);
      account = accounts[0];
      $('#address').val(account);

    });
  },
  sendTransaction: function(amount,account){
    var self = this;
    web3.eth.sendTransaction({
      from:account,
      // to:"0x25684847be4835c5556295f466c9d973076509bb", 
      to:"0x7bfa11aa43833f8b980803bea180c54b82cacb2d", 
      value: web3.toWei(amount, "ether")},
      function(){
        //callback('done');
      });
      
  }
};

window.addEventListener('load', function() {
  // Checking if Web3 has been injected by the browser (Mist/MetaMask)
  if (typeof web3 !== 'undefined') {
    // console.warn("Using web3 detected from external source. If you find that your accounts don't appear or you have 0 MetaCoin, ensure you've configured that source properly. If using MetaMask, see the following link. Feel free to delete this warning. :) http://truffleframework.com/tutorials/truffle-and-metamask")
    // Use Mist/MetaMask's provider
    window.web3 = new Web3(web3.currentProvider);
  } else {
    // console.warn("No web3 detected. Falling back to http://127.0.0.1:9545. You should remove this fallback when you deploy live, as it's inherently insecure. Consider switching to Metamask for development. More info here: http://truffleframework.com/tutorials/truffle-and-metamask");
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    // window.web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8545"));
  }
  var str = window.location+'';
  if(str.split('/').pop()=='register')
  App.start();
  if(str.split('/').pop()=='get-xbn')
  App.start();

  $('#submit').click(function(){
    var eth = $('#eth').val();
    console.log(account);
    App.sendTransaction(eth, account);
  });



});


$(document).ready(function(){

  $('#eth').val(ethrate);
  $('#xbn').val(ethrate*xbnrate);
  $('#eth').keyup(function(){
    var eth = $(this).val();
    var r = Math.round(eth*xbnrate * 100) / 100
    $('#xbn').val(r);
  });



   /* start */
   $('#step1_next_btn').click(function(event){
    event.preventDefault();
     if($('#email').val()==''){
       alert('Email Is Required.');
       return;
     }else if($('#password').val().length<8){
      alert('Passwords must be at least 8 characters long.');
      return;
     }else if($('#password').val()!=$('#password_cfm').val()){
      alert('Confirm Password not matched.');
      return;
     }else{
      $('#step1_div').hide();
      $('#step3_div').hide();
      $('#step2_div').show();
     }
     
   });

   $('#step2_next_btn').click(function(event){
    event.preventDefault();
    if($('#first_name').val()==''){
      alert('First Name Is Required.');
      return;
    }else if($('#address').val()==''){
      alert('ETH Wallet Address is required.');
      return;
    }else{
     $('#step1_div').hide();
     $('#step2_div').hide();
     $('#step3_div').show();
    }
   });


   $('#step2_back_btn').click(function(event){
    event.preventDefault();
      $('#step2_div').hide();
      $('#step3_div').hide();
      $('#step1_div').show();
   });

   $('#step3_back_btn').click(function(event){
    event.preventDefault();
      $('#step3_div').hide();
      $('#step1_div').hide();
      $('#step2_div').show();
   });

   $('#submit').click(function(event){
    event.preventDefault();
    // alert($('#gridCheck').prop('checked'));
    if($('#gridCheck').prop('checked')==false){
      alert('you have to agree to the terms and conditions by checking terms and conditions check box.');
      return;
    }else{
      $('#main_form').submit();
    }
    
   });
  

})
