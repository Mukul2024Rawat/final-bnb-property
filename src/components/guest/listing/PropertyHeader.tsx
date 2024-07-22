// components/PropertyHeader.tsx

import React from 'react';
import { PropertyDetail } from '../../../interfaces/guest/listing/interface';

interface PropertyHeaderProps {
  property: PropertyDetail;
}

const PropertyHeader: React.FC<PropertyHeaderProps> = ({ property }) => {
  return (
    <div className="mb-4">
      <h1 className="text-3xl font-bold">{property.name}</h1>
      <div className="flex items-center mt-2">
        <span className="mr-2">★ {property.rating}</span>
        <span className="mr-2">·</span>
        <span className="underline mr-2">{property.reviewCount} reviews</span>
        <span className="mr-2">·</span>
        <span>{property.location}</span>
      </div>
    </div>
  );
};

export default PropertyHeader;