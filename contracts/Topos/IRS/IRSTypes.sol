// SPDX-License-Identifier: CC0-1.0
pragma solidity ^0.8.0;

abstract contract IRSTypes {
    struct IRS {
        address irsContract;
        address fixedInterestPayer;
        address floatingInterestPayer;
        uint8 ratesDecimals;
        uint8 status;
        uint256 swapRate;
        uint256 spread;
        address assetContract;
        uint256 notionalAmount;
        uint256 paymentFrequency;
        uint256 startingDate;
        uint256 maturityDate;
        uint8 index;
    }

    struct IRSReceipt {
        address from;
        address to;
        address currency;
        uint256 amount;
    }
}