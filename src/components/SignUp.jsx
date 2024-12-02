"use client";
import { useRef, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";

function SignUp() {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const form = useRef(null);
  const router = useRouter();

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSumit = async (e) => {
    e.preventDefault();
    const response = await axios.post("/api/sign_up", user);
    if (response.status === 201) {
      setSuccess("Usuario registrado con éxito");
      setError("");
      router.push("/");
    }
  };

  return (
    <div className="flex items-center justify-center h-full bg-gray-900 text-purple-500 p-4">
      <div className="w-full max-x-md bg-gray-800 rounded-lg shadow-lg p-4 font-mono">
        <div className="mb-4">
          <p className="text-lg">SIGN IN</p>
          <p className="text-sm text-purple-400">
            Type your credentials to proceed...
          </p>
          <form onSubmit={handleSumit} ref={form} className="space-y-4">
            <label
              htmlFor="username"
              className="block text-purple-400"
            >
              Username
            </label>
            <input
              name="username"
              type="text"
              value={user.username}
              onChange={handleChange}
              required
              autoFocus
              className="w-full bg-gray-900 text-purple-500 border border-purple-600 rounded p-2 mt-1 focus:ring-2 focus:rign-purple-600"
            />

            <label htmlFor="email" className="block text-purple-400">
              Email
            </label>
            <input
              name="email"
              type="email"
              value={user.email}
              onChange={handleChange}
              required
              className="w-full bg-gray-900 text-purple-500 border border-purple-600 rounded p-2 mt-1 focus:ring-2 focus:rign-purple-600"
            />

            <label htmlFor="password" className="block text-purple-400">
              Password
            </label>
            <input
              name="password"
              type="password"
              value={user.password}
              onChange={handleChange}
              required
              className="w-full bg-gray-900 text-purple-500 border border-purple-600 rounded p-2 mt-1 focus:ring-2 focus:rign-purple-600"
            />
            <button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700 text-primary-text font-bold py-2 px-4 rounded focus-outline-none focus-rign-2 focus:rign-purple-700"
            >
              Sign Up
            </button>
            <Link className="text-purple-800 flex p-3" href="/sign_in">
              {" "}
              Sign In{" "}
            </Link>
            {error && <p className="mt-4 text-red-600">{error}</p>}
            {success && <p className="mt-4 text-white">{success}</p>}
          </form>
          <div className="mt-4 text-purple-400">
            <p>[user@terminal]$ Welcome! Ready to join the XHUFTS?</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
