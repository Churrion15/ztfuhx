import Link from "next/link";

function NftCard({ nft }) {
  return (
    <Link
      className="bg-gray-800 overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 hover:-translate-y-1 rounded-lg"
      href={`http://localhost:3000/${nft.id}`}
    >
      <div className="relative w-full h-64 md:h-72">
        {nft.image && (
          <img
            src={nft.image}
            className="w-full h-full object-cover"
            alt={nft.name}
          />
        )}
        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black to-transparent p-2">
          <h1 className="text-white text-sm font-semibold truncate">
            {nft.name}
          </h1>
          <h2 className="text-gray-300 text-xs">{nft.price} ETH</h2>
        </div>
      </div>
    </Link>
  );
}

export default NftCard;
