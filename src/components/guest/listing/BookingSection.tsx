// components/BookingSection.tsx

import React from 'react';
import { PropertyDetail } from '../../../interfaces/guest/listing/interface';

interface BookingSectionProps {
  property: PropertyDetail;
}

const BookingSection: React.FC<BookingSectionProps> = ({ property }) => {
  return (
    <div className="border bg-white rounded-lg p-6 sticky top-8">
      <div className="flex justify-between items-center mb-4">
        <span className="text-2xl font-bold">${property.pricePerNight} / night</span>
        <span>★ {property.rating} · {property.reviewCount} reviews</span>
      </div>
      <div className="border rounded-lg p-4 mb-4">
        {/* Your calendar component will go here */}
        <p className="text-center">Calendar Component Placeholder</p>
      </div>
      <button className="w-full bg-red-500 text-white py-3 rounded-lg font-bold">
        Reserve
      </button>
      <p className="text-center mt-4">You won&apos;t be charged yet</p>
    </div>
  );
};

export default BookingSection;