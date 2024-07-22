"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FaUser, FaClipboardList, FaHome } from "react-icons/fa";
import { ReactNode } from "react";
import { usePathname } from "next/navigation";

const Layout: React.FC<{ children: ReactNode }> = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-gray-200 flex shadow-lg">
      <nav className="bg-gray-100 p-4 shadow-md w-20 fixed left-0 h-full overflow-y-auto">
        <ul>
          <Link href="/user/dashboard/profile">
            <li
              className={`cursor-pointer p-4 rounded-br-lg shadow-lg flex items-center justify-center ${
                pathname === "/user/dashboard/profile" ? "bg-rose-600" : ""
              }`}
            >
              <FaUser className="text-gray-800" />
            </li>
          </Link>
          <Link href="/user/dashboard/bookings">
            <li
              className={`cursor-pointer p-4 mt-6 rounded-br-lg shadow-lg flex items-center justify-center ${
                pathname === "/user/dashboard/bookings" ? "bg-rose-600" : ""
              }`}
            >
              <FaClipboardList className="text-gray-800" />
            </li>
          </Link>
        </ul>
        <button
          className={`flex mt-4 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded w-full justify-center ${
            pathname === "/" ? "bg-rose-600" : ""
          }`}
          onClick={() => router.push("/")}
        >
          <FaHome className="text-black" />
        </button>
      </nav>
      <div className="flex-grow p-6 pb-20 ml-20 overflow-y-auto">
        {children}
      </div>
    </div>
  );
};

export default Layout;
