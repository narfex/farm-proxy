// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.13;

import "./Initializable.sol";
import "./UUPSUpgradeable.sol";
import "./OwnableUpgradeable.sol";

contract Upgradeable is Initializable, UUPSUpgradeable, OwnableUpgradeable {
   uint256 public count;

    ///@dev no constructor in upgradable contracts. Instead we have initializers
    ///@param _count initial number for decraesing
   function initialize(uint256 _count) public initializer {
       count = _count;

      ///@dev as there is no constructor, we need to initialise the OwnableUpgradeable explicitly
       __Ownable_init();
   }

   ///@dev required by the OZ UUPS module
   function _authorizeUpgrade(address) internal override onlyOwner {}

   ///@dev decrements when called
   function decrease() external virtual {
       require(count > 2, "no slices left");
       count -= 2;
   }

   ///@dev returns the contract version
   function version() external pure virtual returns (uint256) {
       return 1;
   }

}