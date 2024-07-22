"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { fetchUserBookings, cancelBooking } from "../api/index"; // Adjust the import as needed
import WithAuth from "./withAuth";
import { Booking } from "@/types/userAuthentication";
import {
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaUser,
  FaDollarSign,
  FaUsers,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";
import Loader from "../components/modals/Loader";

const getStatusColor = (status: string) => {
  switch (status) {
    case "confirmed":
    case "Confirmed":
      return "text-green-500";
    case "pending":
    case "Pending":
      return "text-yellow-500";
    case "Cancelled":
    case "cancelled":
      return "text-red-500";
    default:
      return "text-gray-500";
  }
};

// Utility function to format the date
const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const MyBookings: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [errorMessages, setErrorMessages] = useState<string[]>([]);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    setIsLoading(true);
    setError("");
    setErrorMessages([]);
    try {
      const response = await fetchUserBookings();
      const formattedBookings = response.data.map((booking: any) => ({
        id: booking.id,
        placeName: booking.property.title,
        address: `${booking.property.property_address.city}, ${booking.property.property_address.state}, ${booking.property.property_address.country}`,
        checkInDate: booking.checkin_date,
        checkOutDate: booking.checkout_date,
        status: booking.booking_status,
        persons: booking.members,
        isCancellable: booking.property.is_cancellable,
        canCancel:
          booking.property.is_cancellable &&
          new Date(booking.checkout_date) > new Date() &&
          booking.booking_status !== "cancelled",
        visitCompleted:
          booking.booking_status === "Confirmed" &&
          new Date(booking.checkout_date) < new Date(),
        totalPrice: booking.total_amount,
        hostName: booking.host.name,
        imageUrl: booking.property.property_images[0]?.image,
      }));
      setBookings(formattedBookings);
    } catch (error: any) {
      if (error.response && error.response.data && error.response.data.message) {
        setErrorMessages(error.response.data.message.map((msg: any) => msg.message));
      }
      console.error("Failed to fetch bookings", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelBooking = async (id: string) => {
    setIsLoading(true);
    setError("");
    setErrorMessages([]);
    try {
      await cancelBooking(id);
      await fetchBookings();
    } catch (error: any) {
      if (error.response && error.response.data && error.response.data.message) {
        setErrorMessages(error.response.data.message.map((msg: any) => msg.message));
      }
      console.error("Failed to cancel booking", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <h2 className="text-xl font-bold mb-4">My Bookings</h2>
      {errorMessages.length > 0 && (
        <div className="bg-red-500 text-white p-4 mb-4 rounded-lg">
          <p className="font-bold">Error Occurred:</p>
          <ul className="list-disc ml-5">
            {errorMessages.map((errorMessage, index) => (
              <li key={index}>{errorMessage}</li>
            ))}
          </ul>
        </div>
      )}
      <div className="flex justify-center bg-white p-6 rounded-lg shadow-md">
        {isLoading ? (
          <Loader />
        ) : error ? (
          <div className="text-red-500">{error}</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6">
            {bookings.map((booking) => (
              <div
                key={booking.id}
                className="bg-white border border-gray-300 rounded-lg overflow-hidden shadow-md cursor-pointer hover:shadow-lg transition-shadow duration-300 w-full md:w-92"
              >
                <Image
                  src={booking.imageUrl}
                  alt={booking.placeName}
                  width={400}
                  height={200}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-bold text-lg">{booking.placeName}</h3>
                  <p className="flex items-center mt-2">
                    <FaMapMarkerAlt className="mr-2" />
                    {booking.address}
                  </p>
                  <p
                    className={`flex items-center mt-2 ${getStatusColor(
                      booking.status
                    )} font-semibold`}
                  >
                    <FaCalendarAlt className="mr-2" />
                    {booking.status}
                  </p>
                  <p className="flex items-center mt-2">
                    <FaUser className="mr-2" />
                    Host: {booking.hostName}
                  </p>
                  <p className="flex items-center mt-2">
                    <FaDollarSign className="mr-2" />₹{booking.totalPrice}
                  </p>
                  <p className="flex items-center mt-2">
                    <FaCalendarAlt className="mr-2" />
                    Check-In: {formatDate(booking.checkInDate)}
                  </p>
                  <p className="flex items-center mt-2">
                    <FaCalendarAlt className="mr-2" />
                    Check-Out: {formatDate(booking.checkOutDate)}
                  </p>
                  <p className="flex items-center mt-2">
                    <FaUsers className="mr-2" />
                    No. of Persons: {booking.persons}
                  </p>
                  {booking.visitCompleted && (
                    <p className="flex items-center text-green-500 font-semibold mt-2">
                      <FaCheckCircle className="mr-2" />
                      Visit Completed
                    </p>
                  )}
                  {booking.canCancel && (
                    <button
                      onClick={() => handleCancelBooking(booking.id)}
                      className="mt-4 bg-rose-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg w-full flex items-center justify-center"
                    >
                      <FaTimesCircle className="mr-2" />
                      Cancel Booking
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default WithAuth(MyBookings);
