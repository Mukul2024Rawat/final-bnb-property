"use client"
import { HotelData } from "@/types/standardSearch";
import Image from "next/image";

const HotelCard = ({
  imageUrl,
  name,
  rating,
  reviews,
  description,
  price,
  currency,
  dates,
  handleHotelClick
}: HotelData & { handleHotelClick: () => void }) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md mb-4 flex cursor-pointer mt-1" onClick={handleHotelClick}>
      <div className="relative">
        <Image
          src={imageUrl}
          alt={name}
          className="w-full h-48 object-cover"
          width={500}
          height={200}
        />
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start flex-col h-[100%]">
          <div>
            <h2 className="text-lg font-semibold mb-1">{name}</h2>
            <p className="text-gray-600 text-sm">{description}</p>
          </div>
          <div className="flex items-center space-x-1">
            <div className="div">
              <span className="text-yellow-500">★</span>
              <span className="text-sm font-semibold">{rating}</span>
              <span className="text-gray-600 text-sm">({reviews} reviews)</span>
            </div>
            <div className="price">
              <div className=" bg-grey rounded-full px-2 py-1 text-sm font-semibold">
                {currency} {price} /night
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default HotelCard;
