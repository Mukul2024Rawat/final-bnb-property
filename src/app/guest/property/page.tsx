"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { HotelData, ViewportCorners } from "@/types/standardSearch";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { debounce } from "lodash";
import { dummyHotelData } from "@/utils/staticData";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
const MapSearch = dynamic(() => import('@/components/guest/standardSearch/Map'), { ssr: false });
const HotelCard = dynamic(() => import('@/components/guest/standardSearch/PropertyCard'), { ssr: false });

function StandardSearch() {
  const [viewportCorners, setViewportCorners] = useState<ViewportCorners>({
    northEast: { lat: 0, lng: 0 },
    northWest: { lat: 0, lng: 0 },
    southWest: { lat: 0, lng: 0 },
    southEast: { lat: 0, lng: 0 },
  });
  const router = useRouter();
  const [hotelData, setHotelData] = useState<HotelData[]>(dummyHotelData);
  const locationValue = useSelector(
    (state: RootState) => state.search.locationValue
  );
 
  const startDate = useSelector((state: RootState) => state.search.startDate);
  const endDate = useSelector((state: RootState) => state.search.endDate);
  const guestCount = useSelector((state: RootState) => state.search.guestCount);

  // route the page on dynamic route
  const handleHotelClick = (hotelId: string) => {
    router.push(`/guest/property/${hotelId}`);
  };

  // get api for standard search
  // const fetchData = async () => {
  //   try {
  //     const response = await axios.get("/api/search", {
  //       params: {
  //         boundingBox: JSON.stringify(viewportCorners),
  //         locationSearch: JSON.stringify(locationValue),
  //         checkIn:startDate,
  //         checkOut:endDate,
  //         guestCount:JSON.stringify(guestCount),
  //       },
  //     });
  //     console.log(response.data);
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }
  // };
  // const debouncedFetchData = debounce(fetchData, 2000);
  // useEffect(() => {
  //   debouncedFetchData();
  //   return debouncedFetchData.cancel;
  // }, [viewportCorners, locationValue, startDate, endDate, guestCount]);
  return (
    <>
      <div className="mainSearchContainer pt-0 md:pt-[160px]">
        <div className="secondDiv h-[calc(100vh-170px)] bg-slate-200 flex">
          <div className="left flex-[0.6] py-1 px-2 overflow-auto">
            {hotelData &&
              hotelData.map((hotel, index) => (
                <HotelCard
                  key={index}
                  imageUrl={hotel.imageUrl}
                  name={hotel.name}
                  rating={hotel.rating}
                  reviews={hotel.reviews}
                  description={hotel.description}
                  price={hotel.price}
                  currency={hotel.currency}
                  dates={hotel.dates}
                  handleHotelClick={() =>
                    handleHotelClick((index + 1).toString())
                  }
                />
              ))}
          </div>
          <div className="right flex-[0.4] overflow-hidden z-[1]">
            <MapSearch
              setViewportCorners={setViewportCorners}
              hotelData={hotelData}
            />
          </div>
        </div>
      </div>
    </>
  );
}
export default StandardSearch;
