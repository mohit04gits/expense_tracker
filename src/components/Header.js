import React from "react";

function Header() {
  return (
    <header className="text-center mb-10">
      {/* Title */}
      <h1 className="text-3xl sm:text-4xl font-bold text-white">
        SpendWise
      </h1>

      {/* Tagline */}
      <p className="mt-2 text-gray-400 text-sm sm:text-base">
        Track your expenses and manage your money easily
      </p>
    </header>
  );
}

export default Header;