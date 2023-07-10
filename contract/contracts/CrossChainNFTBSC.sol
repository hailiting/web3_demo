// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract CrossChainNFTBSC is ERC721URIStorage, Ownable {
    // NFT ID 计数器
    uint256 private _tokenIds;

    // NFT ID 到 NFT 元数据的映射
    mapping(uint256 => string) private _tokenURIs;

    // TokenBridge 合约地址
    address private _tokenBridge;
    event URI(string indexed _value, uint256 indexed _id);

    // 构造函数
    constructor(
        string memory name,
        string memory symbol,
        address tokenBridge
    ) ERC721(name, symbol) {
        _tokenBridge = tokenBridge;
    }

    // 铸造 NFT
    function mint(address to, string memory nftURI) external onlyOwner {
        _tokenIds++;
        uint256 tokenId = _tokenIds;
        _mint(to, tokenId);
        _setTokenURI(tokenId, nftURI);
    }

    // 接收来自以太坊的 NFT
    function transferFromETH(uint256 tokenId, string memory nftURI) external {
        require(
            msg.sender == _tokenBridge,
            "transferFromETH: only TokenBridge can call"
        );
        _tokenIds++;
        uint256 newTokenId = _tokenIds;
        _mint(msg.sender, newTokenId);
        _setTokenURI(newTokenId, nftURI);
        _burn(tokenId);
    }

    // 设置 NFT 元数据

    function _setTokenURI(
        uint256 tokenId,
        string memory nftURI
    ) internal override {
        _tokenURIs[tokenId] = nftURI;
        emit URI(nftURI, tokenId);
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
}
