// 导入所需的测试工具
import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/CrossChainNFT.sol";

contract TestCrossChainNFT {
    // 获取已部署的合约实例
    CrossChainNFT nft = CrossChainNFT(DeployedAddresses.CrossChainNFT());

    // 测试铸造 NFT
    function testMintNFT() public {
        string memory expectedURI = "https://example.com/nft/1";
        nft.mintNFT(address(this), expectedURI);
        uint256 tokenId = 1;
        string memory actualURI = nft.tokenURI(tokenId);
        Assert.equal(actualURI, expectedURI, "NFT URI 不正确");
    }

    // 测试跨链转移 NFT
    function testTransferToBSC() public {
        bytes32 expectedRecipient = "0x1234567890abcdef";
        string memory nftURI = "https://example.com/nft/2";
        nft.mintNFT(address(this), nftURI);
        uint256 tokenId = 2;
        nft.transferToBSC(tokenId, expectedRecipient);
        bool exists = nft._exists(tokenId);
        Assert.isFalse(exists, "NFT 未被销毁");
    }

    // 测试非所有者调用 transferToBSC
    function testTransferToBSCNotOwner() public {
        bytes32 recipient = "0x1234567890abcdef";
        string memory nftURI = "https://example.com/nft/3";
        nft.mintNFT(address(this), nftURI);
        uint256 tokenId = 3;
        // 用另一个非所有者地址尝试调用 transferToBSC
        bool success = nft.transferToBSC.call(tokenId, recipient, { from: address(0x123) });
        Assert.isFalse(success, "非所有者调用 transferToBSC 应失败");
    }

    // 测试查询不存在的 NFT URI
    function testTokenURINotExists() public {
        uint256 tokenId = 999;
        string memory actualURI = nft.tokenURI(tokenId);
        string memory expectedURI = "";
        Assert.equal(actualURI, expectedURI, "不存在的 NFT URI 应为空");
    }
}