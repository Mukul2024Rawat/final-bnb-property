"use client";

import { useState, useEffect, useRef } from "react";
import { BiSearch } from "react-icons/bi";
import { useRouter } from "next/navigation";
import { setStartDate, setEndDate } from "@/store/slices/searchSlice";
import { useDispatch} from "react-redux";
import LocationModals from "../modals/searchModals/LocationModals";
import { DateRangePicker } from "../ui/dateRangePicker";
import { DateRange } from "react-day-picker";
import GuestDropdown from "../modals/searchModals/GuestDropdown";

const Search = () => {
  const [isSearchModalOpen, setSearchModalOpen] = useState(false);
  const [openLocationModal, setOpenLocationModal] = useState(false);
  const [openGuestDropdown, setOpenGuestDropdown] = useState(false);
  const dispatch = useDispatch();

  const router = useRouter();

  const [inputValue, setInputValue] = useState("");
  const [guestCounts, setGuestCounts] = useState<{ [key: string]: number }>({
    Adults: 0,
    Children: 0,
    Infants: 0,
    Pets: 0,
  });

  const locationModalRef = useRef<HTMLDivElement>(null);
  const guestDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        locationModalRef.current &&
        !locationModalRef.current.contains(event.target as Node)
      ) {
        setOpenLocationModal(false);
      }
      if (
        guestDropdownRef.current &&
        !guestDropdownRef.current.contains(event.target as Node)
      ) {
        setOpenGuestDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const guestLabel = "Add Guests";

  const handleLocationModal = () => {
    setOpenLocationModal(!openLocationModal);
  };

  const closeLocationModal = () => {
    setOpenLocationModal(false);
  };

  //routing page to listing page
  const handleSearch = () => {
    router.push("/guest/property");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleDateChange = (range: DateRange | undefined) => {
    if (range?.from) dispatch(setStartDate(range.from.toISOString()));
    if (range?.to) dispatch(setEndDate(range.to.toISOString()));
  };

  const handleGuestDropdown = () => {
    setOpenGuestDropdown(!openGuestDropdown);
  };

  return (
    <>
      <div className="border-[1px] w-[50%] py-2 rounded-full shadow-sm hover:shadow-md transition cursor-pointer">
        <div className="flex flex-row items-center justify-between">
          <div
            onClick={handleLocationModal}
            className="text-sm font-semibold px-6 text-white relative flex-[0.3]"
            ref={locationModalRef}
          >
            <div className="div flex flex-col">
              <p className="mb-2">Where</p>
              <input
                type="text"
                className="border-none bg-black text-slate-300 focus:outline-none"
                placeholder="Anywhere"
                onChange={handleInputChange}
              />
            </div>
            {openLocationModal && (
              <LocationModals
                closeModal={closeLocationModal}
                inputValue={inputValue}
                setInputValue={setInputValue}
              />
            )}
          </div>

          <div className="hidden sm:block text-sm font-semibold pl-3 border-x-[1px]  text-center text-white flex-[0.4]">
            <div className="div flex flex-col w-[80%]">
              <p className="text-start">When</p>
              <DateRangePicker
                className="border-none bg-transparent text-white"
                onChange={handleDateChange}
              />
            </div>
          </div>

          <div className="text-sm pl-6 pr-2 text-gray-600 flex flex-row items-center gap-3 flex-[0.3] relative">
            <div
              className="hidden sm:block"
              onClick={handleGuestDropdown}
              ref={guestDropdownRef}
            >
              <p className="text-start text-white">Who</p>
              {guestLabel}
              {openGuestDropdown && (
                <GuestDropdown
                  guestCounts={guestCounts}
                  setGuestCounts={setGuestCounts}
                  closeDropdown={() => setOpenGuestDropdown(false)}
                />
              )}
            </div>
            <div className="p-2 bg-rose-500 rounded-full text-white">
              <BiSearch size={18} onClick={handleSearch} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Search;
