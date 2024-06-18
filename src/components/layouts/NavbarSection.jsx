import Link from "next/link";
import React from "react";

export default function NavbarSection() {
  return (
    <nav className="flex justify-between items-center bg-blue-700 text-white px-8 py-4">
      <h3 className="text-2xl font-bold">
        <Link href="/">Navbar</Link>
      </h3>
      <ul className="flex gap-4">
        <li className="hover:underline hover:underline-offset-4">
          <Link href="/">Home</Link>
        </li>
        <li className="hover:underline hover:underline-offset-4">
          <Link href="/upload">Upload</Link>
        </li>
      </ul>
    </nav>
  );
}
