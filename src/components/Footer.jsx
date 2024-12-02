import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-700 text-gray-400 py-8">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        {/* Sección de Links */}
        <div className="mb-4 md:mb-0">
          <h2 className="text-lg font-semibold text-gray-200 mb-2">Enlaces</h2>
          <ul className="space-y-2">
            <li>
              <a href="/" className="hover:text-white transition">
                Inicio
              </a>
            </li>

            <li>
              <a href="/contacto" className="hover:text-white transition">
                Contacto
              </a>
            </li>
            <li>
              <a href="/terminos" className="hover:text-white transition">
                Términos y Condiciones
              </a>
            </li>
          </ul>
        </div>

        {/* Sección de Social Media */}
        <div className="mb-4 md:mb-0">
          <h2 className="text-lg font-semibold text-gray-200 mb-2">Síguenos</h2>
          <div className="flex space-x-4">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition"
            >
              <i className="fab fa-instagram"></i> Instagram
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
