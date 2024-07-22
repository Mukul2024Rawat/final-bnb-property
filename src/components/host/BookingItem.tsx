import React from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';

interface BookingProps {
  name: string;
  id: string;
  days: number;
  startDate: string;
  endDate: string;
  payment: number;
  status: 'CONFIRMED' | 'PENDING' | 'DECLINED';
}

interface BookingItemProps {
  booking: BookingProps;
}

const BookingItem: React.FC<BookingItemProps> = ({ booking }) => {
  return (
    <div className="p-4 hover:bg-gray-50 transition-colors duration-200">
      <div className="md:grid md:grid-cols-5 gap-4">
        <div className="mb-2 md:mb-0">
          <div className="flex items-center">
            <div className="flex-shrink-0 h-10 w-10 mr-4">
              <img className="h-10 w-10 rounded-full" src="/api/placeholder/40/40" alt="" />
            </div>
            <div>
              <div className="text-sm font-medium text-gray-900">{booking.name}</div>
              <div className="text-sm text-gray-500">{booking.id}</div>
            </div>
          </div>
        </div>
        <div className="mb-2 md:mb-0">
          <div className="text-sm text-gray-900">{booking.days} days</div>
          <div className="text-sm text-gray-500">{booking.startDate} - {booking.endDate}</div>
        </div>
        <div className="mb-2 md:mb-0">
          <div className="text-sm text-gray-900">${booking.payment}</div>
          <div className="text-sm text-gray-500">Paid</div>
        </div>
        <div className="mb-2 md:mb-0">
          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
            booking.status === 'CONFIRMED' ? 'bg-green-100 text-green-800' :
            booking.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
            'bg-red-100 text-red-800'
          }`}>
            {booking.status}
          </span>
        </div>
        <div>
          {booking.status === 'PENDING' ? (
            <div className="flex space-x-2">
              <button className="text-green-600 hover:text-green-900 transition-colors duration-200">ACCEPT</button>
              <button className="text-red-600 hover:text-red-900 transition-colors duration-200">DECLINE</button>
            </div>
          ) : (
            <button className="text-gray-600 hover:text-gray-900 transition-colors duration-200">
              <BsThreeDotsVertical />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingItem;
