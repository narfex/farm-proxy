// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.13;

import "./Upgradeable.sol";

contract UpgradeableV2 is Upgradeable {

   ///@dev increments the slices when called
   function refill() external virtual {
       count += 1;
   }

   ///@dev decrements the slices when called
   function decrease() external override virtual{
       require(count > 1, "no slices left");
       count -= 1;
   }

   ///@dev returns the contract version
   function version() external pure override virtual returns (uint256) {
       return 2;
   }

}