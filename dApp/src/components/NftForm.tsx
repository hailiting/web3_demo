import React, { useCallback, useState } from "react";
import { mintNFT } from "../utils/wallet";
import { useGlobalState } from "../state/global/hooks";
import useDebouncedCallback from "../hooks/useDebouncedCallback";

const NftForm: React.FC = () => {
  const [to, setTo] = useState("");
  const [nftURI, setNftURI] = useState("");
  const { type } = useGlobalState();
  const handleSubmit = useDebouncedCallback(
    useCallback(
      async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
          await mintNFT("contractAddress", to, nftURI, type);
          alert("NFT minted successfully!");
        } catch (err) {
          console.error(err);
          alert("Failed to mint NFT");
        }
      },
      [type, nftURI, to]
    ),
    1000
  );

  return (
    <form onSubmit={handleSubmit}>
      <label>
        To:
        <input type="text" value={to} onChange={(e) => setTo(e.target.value)} />
      </label>
      <label>
        NFT URI:
        <input
          type="text"
          value={nftURI}
          onChange={(e) => setNftURI(e.target.value)}
        />
      </label>
      <button type="submit">Mint NFT</button>
    </form>
  );
};

export default NftForm;
