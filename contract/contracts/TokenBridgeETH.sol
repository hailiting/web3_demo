// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./CrossChainNFT.sol";
import "./CrossChainNFTBSC.sol";

contract TokenBridgeETH {
    address public nftContract;
    address public nftBSCContract;

    constructor(address _nftContract, address _nftBSCContract) {
        nftContract = _nftContract;
        nftBSCContract = _nftBSCContract;
    }

    function transferToBSC(address recipient, uint256 tokenId) external {
        // 从以太坊 NFT 合约中转移 NFT
        CrossChainNFT(nftContract).safeTransferFrom(
            msg.sender,
            recipient,
            tokenId
        ); // 触发 BSC 上的事件，表示 NFT 已经转移
        CrossChainNFTBSC(nftBSCContract).transferFromETH(
            msg.sender,
            recipient,
            tokenId
        );
    }
}
