// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract MyNFT is ERC721 {
    address private _bridgeAddress;
    uint256 private _chainId;

    constructor(
        string memory name_,
        string memory symbol_,
        address bridgeAddress_,
        uint256 chainId_
    ) ERC721(name_, symbol_) {
        _bridgeAddress = bridgeAddress_;
        _chainId = chainId_;
    }

    function transferToChain(
        uint256 tokenId_,
        uint256 destinationChainId_,
        bytes32 destinationAddress_
    ) external {
        require(
            ownerOf(tokenId_) == msg.sender,
            "MyNFT: caller is not the owner"
        );
        _burn(tokenId_);
        bytes memory message = abi.encodeWithSignature(
            "transfer(uint246, uint256, bytes32)",
            tokenId_,
            destinationChainId_,
            destinationAddress_
        );
        (bool success, ) = _bridgeAddress.call(message);
        require(success, "MyNFT: transfer to bridge failed");
    }
}
