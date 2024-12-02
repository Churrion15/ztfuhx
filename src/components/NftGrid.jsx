import NftCard from "./NftCard";

function NftGrid({ nfts }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {nfts.map((nft) => (
        <NftCard nft={nft} key={nft.id} />
      ))}
    </div>
  );
}

export default NftGrid;
