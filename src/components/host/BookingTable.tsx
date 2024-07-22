import React, { useEffect, useState } from 'react';
import { api } from '@/api';

interface Booking {
  id: number;
  checkin_date: string;
  checkout_date: string;
  booking_date: string;
  members: number;
  booking_status: 'pending' | 'confirm' | 'reject';
  total_amount: string;
  property: {
    id: number;
    title: string;
  };
  guest: {
    name: string;
  };
}

const fetchBookings = async (): Promise<Booking[]> => {
  try {
    const response = await api.get('/host/booking', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching bookings:', error);
    throw error;
  }
};

const updateBookingStatus = async (bookingId: number, status: 'pending' | 'confirm' | 'reject'): Promise<Booking> => {
  try {
    const response = await api.patch(
      `/host/booking/${bookingId}/status`,
      { status },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error updating booking status:', error);
    throw error;
  }
};

const BookingTable: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    const loadBookings = async () => {
      try {
        const data = await fetchBookings();
        setBookings(data);
      } catch (error) {
        console.error('Error loading bookings:', error);
      }
    };

    loadBookings();
  }, []);

  const handleStatusChange = async (id: number, status: 'pending' | 'confirm' | 'reject') => {
    try {
      await updateBookingStatus(id, status);
      setBookings((prevBookings) =>
        prevBookings.map((booking) =>
          booking.id === id ? { ...booking, booking_status: status } : booking
        )
      );
    } catch (error) {
      console.error('Error updating booking status:', error);
    }
  };

  const getStayDuration = (checkinDate: string, checkoutDate: string) => {
    const checkin = new Date(checkinDate);
    const checkout = new Date(checkoutDate);
    const diffTime = Math.abs(checkout.getTime() - checkin.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return `${diffDays} days (${checkin.toLocaleDateString()} - ${checkout.toLocaleDateString()})`;
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="hidden md:block">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border-b">Booking ID</th>
              <th className="py-2 px-4 border-b">Guest Name</th>
              <th className="py-2 px-4 border-b">Stay Duration</th>
              <th className="py-2 px-4 border-b">Payment</th>
              <th className="py-2 px-4 border-b">Property Title</th>
              <th className="py-2 px-4 border-b">Order Status</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b">{booking.id}</td>
                <td className="py-2 px-4 border-b">{booking.guest.name}</td>
                <td className="py-2 px-4 border-b">
                  {getStayDuration(booking.checkin_date, booking.checkout_date)}
                </td>
                <td className="py-2 px-4 border-b">${booking.total_amount}</td>
                {/* <td className="py-2 px-4 border-b">{booking.property.title}</td> */}
                <td className="py-2 px-4 border-b">{booking.booking_status}</td>
                <td className="py-2 px-4 border-b">
                  <button className="text-blue-500 hover:underline">View Details</button>
                  {new Date() > new Date(booking.checkout_date) && (
                    <button className="text-blue-500 hover:underline ml-2">Review</button>
                  )}
                  {booking.booking_status === 'pending' && (
                    <select
                      value={booking.booking_status}
                      onChange={(e) => handleStatusChange(booking.id, e.target.value as 'pending' | 'confirm' | 'reject')}
                      className="ml-2 border border-gray-300 rounded-md"
                    >
                      <option value="pending">Pending</option>
                      <option value="confirm">Confirm</option>
                      <option value="reject">Reject</option>
                    </select>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="block md:hidden">
        {bookings.map((booking) => (
          <div key={booking.id} className="bg-white shadow rounded-lg p-4 mb-4 border border-gray-200">
            <div className="flex justify-between items-center mb-2">
              <div>
                <h3 className="text-lg font-semibold">{booking.guest.name}</h3>
                <p>{getStayDuration(booking.checkin_date, booking.checkout_date)}</p>
                <p>${booking.total_amount}</p>
                {/* <p>{booking.property.title}</p> */}
                <p className="font-semibold">Booking ID: {booking.id}</p>
              </div>
              <div className="flex flex-col items-end">
                <button className="text-blue-500 hover:underline">View Details</button>
                {new Date() > new Date(booking.checkout_date) && (
                  <button className="text-blue-500 hover:underline mt-2">Review</button>
                )}
                {booking.booking_status === 'pending' && (
                  <select
                    value={booking.booking_status}
                    onChange={(e) => handleStatusChange(booking.id, e.target.value as 'pending' | 'confirm' | 'reject')}
                    className="mt-2 border border-gray-300 rounded-md"
                  >
                    <option value="pending">Pending</option>
                    <option value="confirm">Confirm</option>
                    <option value="reject">Reject</option>
                  </select>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookingTable;
