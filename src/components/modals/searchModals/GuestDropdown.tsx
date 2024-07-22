import {
  decrementGuestCount,
  incrementGuestCount,
} from "@/store/slices/searchSlice";
import { IoMdClose } from "react-icons/io";
import { useDispatch } from "react-redux";

interface GuestDropdownProps {
  guestCounts: { [key: string]: number };
  setGuestCounts: React.Dispatch<
    React.SetStateAction<{ [key: string]: number }>
  >;
  closeDropdown: () => void;
}

const GuestDropdown: React.FC<GuestDropdownProps> = ({
  guestCounts,
  setGuestCounts,
  closeDropdown,
}) => {
  const dispatch = useDispatch();
  const categories = [
    { key: "Adults", label: "Ages 13 or above" },
    { key: "Children", label: "Ages 2–12" },
    { key: "Infants", label: "Under 2" },
    { key: "Pets", label: "Bringing a service animal?" },
  ];

  const handleIncrement = (
    e: React.MouseEvent<HTMLButtonElement>,
    key: string
  ) => {
    e.stopPropagation();
    setGuestCounts((prev) => ({ ...prev, [key]: prev[key] + 1 }));
    if (key === "Adults" || key === "Children") {
      dispatch(incrementGuestCount({ key: "Members" }));
    } else if (key === "Infants" || key === "Pets") {
      dispatch(incrementGuestCount({ key: key }));
    }
  };

  const handleDecrement = (
    e: React.MouseEvent<HTMLButtonElement>,
    key: string
  ) => {
    e.stopPropagation();

    setGuestCounts((prev) => ({ ...prev, [key]: Math.max(prev[key] - 1, 0) }));
    if (key === "Adults" || key === "Children") {
      dispatch(decrementGuestCount({ key: "Members" }));
    } else if (key === "Infants" || key === "Pets") {
      dispatch(decrementGuestCount({ key: key }));
    }
  };

  return (
    <div className="absolute top-12 right-0 bg-white shadow-lg rounded-lg p-4 w-64 z-10">
      {categories.map((category) => (
        <div
          key={category.key}
          className="flex justify-between items-center my-2"
        >
          <div>
            <p className="font-semibold">{category.key}</p>
            <p className="text-sm text-gray-600">{category.label}</p>
          </div>
          <div className="flex items-center">
            <button
              className="text-gray-600 bg-gray-200 rounded-full w-8 h-8 flex justify-center items-center"
              onClick={(e) => handleDecrement(e, category.key)}
            >
              -
            </button>
            <span className="mx-4">{guestCounts[category.key]}</span>
            <button
              className="text-gray-600 bg-gray-200 rounded-full w-8 h-8 flex justify-center items-center"
              onClick={(e) => handleIncrement(e, category.key)}
            >
              +
            </button>
          </div>
        </div>
      ))}
      <div className="flex justify-end">
        <button
          className="text-gray-500 px-4 py-2 rounded hover:text-gray-600 transition-colors"
          onClick={closeDropdown}
        >
          <IoMdClose size={18} />
        </button>
      </div>
    </div>
  );
};

export default GuestDropdown;
