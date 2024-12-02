"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import axios from "axios";

async function loadNft(nftId) {
  const { data } = await axios.get("http://localhost:3000/api/nfts/" + nftId);
  return data;
}

function NftPage({ params }) {
  const [nft, setNft] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { id } = params;
  const { data: session } = useSession();
  const router = useRouter();

  const handlePurchase = async () => {
    if (!session) {
      alert("Please sign in to purchase this NFT");
    }
  };

  useEffect(() => {
    async function fetchNft() {
      const nftData = await loadNft(params.id);
      setNft(nftData);
    }

    fetchNft();
  }, [params.id]);

  if (!nft) {
    return <div className="text-center text-white">Loading...</div>;
  }

  return (
    <section className="flex justify-center items-center min-h-[calc(100vh-10rem)] bg-gray-900">
      <div className="max-w-5xl w-full bg-gray-800 shadow-lg overflow-hidden">
        <div className="flex flex-col lg:flex-row">
          {/* Imagen del NFT */}
          <div className="lg:w-1/2 bg-gray-900 flex justify-center items-center relative">
            <img
              src={nft.image}
              className="w-full h-auto object-contain lg:max-h-[500px]"
              alt={nft.name}
            />
            <button
              className="absolute bottom-4 right-4 bg-purple-600 text-white py-2 px-4 hover:bg-purple-700"
              onClick={() => setIsModalOpen(true)}
            >
              View Image
            </button>
          </div>

          {/* Detalles del NFT */}
          <div className="lg:w-1/2 p-6 lg:p-8 text-gray-300">
            <h1 className="text-3xl lg:text-4xl font-bold mb-4">{nft.name}</h1>
            <div className="flex items-center space-x-2 mb-6">
              <span className="text-xl lg:text-2xl font-bold text-white">
                ${nft.price}
              </span>
              <span className="text-sm text-gray-400">Available</span>
            </div>

            <h2 className="text-lg font-semibold mb-2">Description</h2>
            <p className="mb-6 text-gray-400 leading-relaxed">
              {nft.description}
            </p>

            <div className="space-y-3">
              <button className="w-full bg-purple-600 text-white py-3 font-medium hover:bg-purple-700 transition-colors">
                BUY NOW
              </button>
              <button className="w-full bg-gray-700 text-white py-3 font-medium hover:bg-gray-600 transition-colors">
                MAKE AN OFFER
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal para mostrar la imagen en tamaño completo */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="relative max-w-4xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 text-white bg-gray-800 p-2 hover:bg-gray-700"
              onClick={() => setIsModalOpen(false)}
            >
              Close
            </button>
            <img
              src={nft.image}
              className="w-full h-auto object-contain"
              alt={nft.name}
            />
          </div>
        </div>
      )}
    </section>
  );
}

export default NftPage;
