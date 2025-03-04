import React from "react";

const Header = () => {
  return (
    <header className="bg-black text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 href="/" className="text-2xl font-bold">
        <a href="/" className="text-white">my</a>
        <a href="/" className="text-yellow-500">UCF</a>
        </h1>
        <nav>
          <ul className="flex gap-4">
            <li><a href="#" className="hover:underline">Academics</a></li>
            <li><a href="#" className="hover:underline">Finances</a></li>
            <li><a href="#" className="hover:underline">Online Courses</a></li>
            <li><a href="#" className="hover:underline">Account</a></li>
            <li><a href="https://webmail.ucf.edu" className="hover:underline">Student Email</a></li>
            <li><a href="#" className="hover:underline">Support</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;