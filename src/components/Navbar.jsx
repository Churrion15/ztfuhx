"use client";
import { useSession, signOut, signIn } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";

function Navbar() {
  const { data: session } = useSession();
  const [showDropdown, setShowDropdown] = useState(false);
  const [confirmLogout, setConfirmLogout] = useState(false);

  const handleSignOut = () => {
    setConfirmLogout(false);
    signOut();
  };

  return (
    <nav className="bg-zinc-900 text-text-primary py-3 mb-2">
      <div className="container mx-auto flex justify-between items-center px-4">
        {/* Logo */}
        <Link href="/">
          <div className="flex items-center space-x-2">
            <img src="favicon.ico" alt="Logo" className="h-8 w-8" />
            <h3 className="text-text-primary text-2xl md:text-3xl">XHUFTS</h3>
          </div>
        </Link>

        {/* Perfil / Inicio de sesión */}
        {session?.user ? (
          <div className="relative flex items-center">
            <p className="hidden md:block mr-2">{session.user.name}</p>
            <img
              src={session.user.image}
              alt="Profile"
              className="w-10 h-10 rounded-full cursor-pointer"
              onClick={() => setShowDropdown((prev) => !prev)}
            />
            {/* Menú desplegable */}
            {showDropdown && (
              <div className="absolute right-0 top-12 bg-white text-black rounded shadow-md w-48">
                <button
                  className="block px-4 py-2 hover:bg-gray-200 w-full text-left"
                  onClick={() => setConfirmLogout(true)}
                >
                  Cerrar sesión
                </button>
              </div>
            )}
            {/* Confirmación de cierre de sesión */}
            {confirmLogout && (
              <div className="absolute right-0 top-20 bg-white text-black rounded shadow-md p-4 w-64">
                <p className="mb-4">
                  ¿Estás seguro de que deseas cerrar sesión?
                </p>
                <div className="flex justify-between">
                  <button
                    onClick={() => setConfirmLogout(false)}
                    className="bg-gray-200 hover:bg-gray-300 text-black font-semibold py-1 px-4 rounded"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleSignOut}
                    className="bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-4 rounded"
                  >
                    Cerrar sesión
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <button
            onClick={() => signIn()}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
          >
            Iniciar sesión
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
