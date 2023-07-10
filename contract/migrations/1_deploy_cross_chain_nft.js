const CrossChainNFT = artifacts.require("CrossChainNFT");

module.exports = function (deployer) {
  // 部署 CrossChainNFT 合约，并传递构造函数参数
  deployer
    .deploy(
      CrossChainNFT,
      "MyNFT",
      "MNFT",
      "0x0290FB167208Af455bB137780163b7B7a9a10C16"
    )
    .then(async (instance) => {
      // 铸造两个 NFT
      await instance.mintNFT(
        "0x98F579252b517BAeA1eF2317cee6287652A5F07B",
        "https://baidu.com/"
      );
    });
};
