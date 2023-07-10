// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract CrossChainNFT is ERC721, Ownable {
    // NFT ID 计数器
    uint256 private _tokenIds;

    // NFT ID 到 NFT 元数据的映射
    mapping(uint256 => string) private _tokenURIs;

    // TokenBridge 合约地址
    address private _tokenBridge;

    // 构造函数
    constructor(
        string memory name,
        string memory symbol,
        address tokenBridge
    ) ERC721(name, symbol) {
        _tokenBridge = tokenBridge;
    }

    // 铸造 NFT
    function mintNFT(address to, string memory nftURI) external onlyOwner {
        _tokenIds++;
        uint256 tokenId = _tokenIds;
        _mint(to, tokenId);
        _setNFTURI(tokenId, nftURI);
    }

    // 跨链转移 NFT
    function transferToBSC(
        uint256 tokenId,
        bytes32 recipient
    ) external onlyOwner {
        bytes memory data = abi.encodeWithSignature(
            "transferToBSC(uint256,bytes32)",
            tokenId,
            recipient
        );
        (bool success, ) = address(_tokenBridge).call(data);
        require(success, "transferToBSC failed");
        _burn(tokenId);
    }

    // 设置 NFT 元数据
    function _setNFTURI(uint256 tokenId, string memory nftURI) internal {
        _tokenURIs[tokenId] = nftURI;
        emit NFTURI(nftURI, tokenId);
    }

    // 获取 NFT 元数据
    function tokenURI(
        uint256 tokenId
    ) public view virtual override returns (string memory) {
        require(
            _exists(tokenId),
            "ERC721Metadata: URI query for nonexistent token"
        );
        return _tokenURIs[tokenId];
    }

    // 定义 NFTURI 事件
    event NFTURI(string uri, uint256 indexed tokenId);
}
