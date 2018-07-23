var Token = artifacts.require("./Token.sol");
var Sale = artifacts.require("./Sale.sol");

module.exports = function(deployer) {
	deployer.deploy(Sale, "0x814167D60Af0a8Deecb0cF77Cc17869aC9dbF040").then(function() {
		return deployer.deploy(Token, Sale.address);
	});
};
