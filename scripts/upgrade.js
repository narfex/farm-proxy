const { ethers, upgrades } = require("hardhat");

const PROXY = "0x20f68EcdE00c3EA3eE4c8Bd925d668E163b291c4"; //0x740081287885D35691F9b85A5792D65B4d8d9DE4

async function main() {
 const PizzaV2 = await ethers.getContractFactory("PizzaV2");
 console.log("Upgrading Pizza...");
 await upgrades.upgradeProxy(PROXY, PizzaV2);
 console.log("Pizza upgraded successfully");
}

main() 
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
