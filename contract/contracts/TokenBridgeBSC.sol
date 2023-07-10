pragma solidity ^0.8.4;

import "./CrossChainNFTBSC.sol";

contract TokenBridgeBSC {
    address public nftContract;
    address public nftETHContract;

    constructor(address _nftContract, address _nftETHContract) {
        nftContract = _nftContract;
        nftETHContract = _nftETHContract;
    }

    function transferFromETH(
        address sender,
        address recipient,
        uint256 tokenId
    ) external {
        require(
            msg.sender == nftETHContract,
            "Only ETH TokenBridge contract can call this function"
        );
        // 从 BSC NFT 合约中转移 NFT
        CrossChainNFTBSC(nftContract).transferFrom(sender, recipient, tokenId);
    }
}
