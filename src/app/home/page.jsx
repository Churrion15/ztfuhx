import Hero from "@/components/Hero";
import NftGrid from "@/components/NftGrid";
import axios from "axios";

async function loadNfts() {
  const { data } = await axios.get("http://localhost:3000/api/nfts");
  return data;
}

async function NftsPage() {
  const nfts = await loadNfts();

  return (
    <div className="bg-gray-900 min-h-screen">
      {/* Hero Section */}
      <div className="container mx-auto px-4">
        <div className="mb-6">
          <Hero />
        </div>
      </div>

      {/* NFT Grid */}
      <div className="container mx-auto px-4">
        <NftGrid nfts={nfts} />
      </div>
    </div>
  );
}

export default NftsPage;
