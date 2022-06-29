// const hre = require("hardhat");

// async function main() {

//   const Vesting = await ethers.getContractFactory("VestingForTeam");

//   const vesting = await Vesting.deploy(
//     "0x3764Be118a1e09257851A3BD636D48DFeab5CAFE", // tokenContract
//     "0x9e8db3942797d2578f48caf5663eb22e286ad84b", // owner address
//   );
//   await vesting.deployed();

//   console.log("Vesting deployed to:", vesting.address);
// }

const { ethers, upgrades } = require("hardhat");

const SLICES = 8;
async function main() {
  const Pizza = await ethers.getContractFactory("Pizza");

 console.log("Deploying Pizza...");

 const pizza = await upgrades.deployProxy(Pizza, [SLICES], {
   initializer: "initialize",
 });
 await pizza.deployed();

 console.log("Pizza deployed to:", pizza.address);
}

main() 
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });