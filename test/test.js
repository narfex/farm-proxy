const { expect } = require("chai");
const { BigNumber, utils } = require("ethers");
const { ethers, deployments } = require("hardhat");

function ether(eth) {
    let weiAmount = ethers.utils.parseEther(eth)
    return weiAmount;
}

async function getLatestBlockTimestamp() {
    return (await ethers.provider.getBlock("latest")).timestamp || 0
}

async function skipTimeTo(timestamp) {
    await network.provider.send("evm_setNextBlockTimestamp", [timestamp])
    await network.provider.send("evm_mine")
}

const HALF_YEAR = 15811200;

describe ("Vesting Narfex", async function () {
    let owner, user1;

    beforeEach ("Deploy the contract", async function () {
        [owner, user1] = await ethers.getSigners();
        Mock = await ethers.getContractFactory("MockBEP20");
        mock = await Mock.deploy(113);
        await mock.deployed();
        Vesting = await ethers.getContractFactory("VestingForTeam");
        vesting = await Vesting.deploy(mock.address, owner.address);
        await vesting.deployed();

        expect (await mock.transfer(vesting.address, ether("113"))).to.ok;
        expect (await mock.balanceOf(vesting.address)).to.equal(ether("113"));
        expect (await vesting.tokenContract()).to.equal(mock.address);
        expect (await vesting.owner()).to.equal(owner.address);
        expect (await vesting.percantageUnlock()).to.equal(await getLatestBlockTimestamp() - 1);
    });

    it ("claimNRFX", async function () {
        await expect (vesting.connect(user1).claimNRFX()).to.be.revertedWith("Not owner");
        await expect (vesting.claimNRFX()).to.be.revertedWith("Wait half an year");

        expect (await mock.balanceOf(owner.address)).to.equal(0);
        expect (await mock.balanceOf(vesting.address)).to.equal(ether("113"));

        await skipTimeTo(await getLatestBlockTimestamp() + HALF_YEAR);

        expect (vesting.claimNRFX()).to.ok
            .to.emit(vesting, 'ClaimNRFX')
            .withArgs(owner.address, ether("11.3"));

        expect (await mock.balanceOf(vesting.address)).to.equal(ether("101.7"));
        expect (await mock.balanceOf(owner.address)).to.equal(ether("11.3"));
        
    })

});