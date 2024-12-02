"use client";
import { useRef, useState } from "react";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";

function NftForm() {
  const [nft, setNft] = useState({
    name: "",
    price: 0,
    description: "",
  });

  const [file, setFile] = useState(null);
  const form = useRef(null);
  const router = useRouter();
  const params = useParams();

  const handleChange = (e) => {
    setNft({
      ...nft,
      [e.target.name]: e.target.value,
    });
  };

  const handleSumit = async (e) => {
    e.preventDefault();
    if (!params.id) {
      const formData = new FormData();
      formData.append("name", nft.name);
      formData.append("price", nft.price);
      formData.append("description", nft.description);

      if (file) {
        formData.append("image", file);
      }

      const ress = await axios.post("/api/nfts", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(ress);
    } else {
      const res = await axios.put("/api/nfts" + params.id, nft);
      console.log(res);
    }

    form.current.reset();
    router.refresh();
    router.push("http://localhost:3000/");
  };

  return (
    <div className="bg-gray-900 h-[calc(100vh-5rem)] flex items-center justify-center">
      <div className="flex gap-8">
        <form
          className="bg-gray-800 shadow-md border-2 border-purple-700 p-8"
          onSubmit={handleSumit}
          ref={form}
        >
          <label
            htmlFor="name"
            className="block text-purple-400 text-xl font-mono mb-2"
          >
            Name
          </label>
          <input
            name="name"
            type="text"
            onChange={handleChange}
            className="bg-gray-900 text-purple-300 font-mono border-2 border-purple-700 focus:border-purple-500 rounded w-full py-2 px-3 mb-4 focus:outline-none"
            autoFocus
          />

          <label
            htmlFor="price"
            className="block text-purple-400 text-xl font-mono mb-2"
          >
            Price
          </label>
          <input
            name="price"
            type="text"
            onChange={handleChange}
            className="bg-gray-900 text-purple-300 font-mono border-2 border-purple-700 focus:border-purple-500 rounded w-full py-2 px-3 mb-4 focus:outline-none"
          />

          <label
            htmlFor="description"
            className="block text-purple-400 text-xl font-mono mb-2"
          >
            Description
          </label>
          <textarea
            name="description"
            rows={3}
            onChange={handleChange}
            className="bg-gray-900 text-purple-300 font-mono border-2 border-purple-700 focus:border-purple-500 rounded w-full py-2 px-3 mb-4 focus:outline-none"
          />

          <label
            htmlFor="nftImage"
            className="block text-purple-400 text-xl font-mono mb-2"
          >
            NFT
          </label>
          <input
            type="file"
            className="bg-gray-900 text-purple-300 font-mono border-2 border-purple-700 focus:border-purple-500 rounded w-full py-2 px-3 mb-4 focus:outline-none"
            onChange={(e) => {
              setFile(e.target.files[0]);
            }}
          />

          <button className="bg-gray-900 text-purple-400 border-2 border-purple-700 hover:bg-purple-800 hover:text-white font-mono py-2 px-4 rounded transition duration-200 w-full">
            Save NFT
          </button>
        </form>

        {file && (
          <div className="flex items-center justify-center">
            <img
              className="w-60 object-contain border-2 border-purple-700"
              src={URL.createObjectURL(file)}
              alt="NFT preview"
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default NftForm;
