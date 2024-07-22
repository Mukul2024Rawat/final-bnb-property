"use client";

import { useCallback, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { IoGlobeOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";
import MenuItem from "./MenuItem";
import Avatar from "../Avatar";
import { useAuth } from "../../contexts/AuthContext";
import { UserMenuProps } from "@/types/userAuthentication";
import { fetchHostProperties } from "@/api";
import Loader from "../modals/Loader";

const UserMenu: React.FC<UserMenuProps> = ({
  isAuthenticated,
  onLogin,
  onSignup,
  onRent,
}) => {
  const router = useRouter();
  const { logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  const handleClick = async () => {
    onRent();
    if (!isAuthenticated) {
      onLogin();
      return;
    }
    setIsLoading(true);
    try {
      const response = await fetchHostProperties();
      setIsLoading(false);

      if (response.status === 200 && response.data.length > 0) {
        router.push("/host/dashboard");
      } else {
        router.push("/become-a-host");
      }
    } catch (error) {
      console.error("Error fetching property data:", error);
      setIsLoading(false);
      router.push("/become-a-host");
    }
  };

  return (
    <div className="relative">
      {isLoading && <Loader />}
      <div className="flex flex-row items-center gap-3">
        <div
          onClick={handleClick}
          className="md:block text-white text-sm font-semibold py-3 px-4 rounded-full hover:bg-gray-800 transition cursor-pointer lg:flex items-center gap-4"
        >
          <p>Become a Host</p>
          <IoGlobeOutline />
        </div>
        <div
          onClick={toggleOpen}
          className="p-4 md:py-1 hover:bg-gray-800 md:px-2 border-[1px] text-white border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar src="/profile.jpg" />
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm">
          <div className="flex flex-col cursor-pointer">
            {isAuthenticated ? (
              <>
                <MenuItem
                  label="My Profile"
                  onClick={() => router.push("/user/dashboard/profile")}
                />
                <MenuItem
                  label="My reservations"
                  onClick={() => router.push("/user/dashboard/bookings")}
                />
                <hr />
                <MenuItem label="Logout" onClick={logout} />
              </>
            ) : (
              <>
                <MenuItem label="Login" onClick={onLogin} />
                <MenuItem label="Sign up" onClick={onSignup} />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
