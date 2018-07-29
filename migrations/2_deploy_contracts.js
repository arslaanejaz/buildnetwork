var Token = artifacts.require("./Token.sol");
var Sale = artifacts.require("./Sale.sol");

module.exports = function(deployer) {
	deployer.deploy(Sale, "0x0619732057C069eF88B25bFB2f6A20155a0721a6").then(function() {
		return deployer.deploy(Token, Sale.address);
	});
};
