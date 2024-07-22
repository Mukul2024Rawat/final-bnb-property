// components/PropertyDetails.tsx

import React from 'react';
import { PropertyDetail  } from '../../../interfaces/guest/listing/interface';

interface PropertyDetailsProps {
  property: PropertyDetail;
}

const PropertyDetails: React.FC<PropertyDetailsProps> = ({ property }) => {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-semibold mb-4">Entire rental unit hosted by {property.host.name}</h2>
      <div className="flex space-x-4 mb-4">
        <span>{property.guests} guests</span>
        <span>·</span>
        <span>{property.bedrooms} bedroom</span>
        <span>·</span>
        <span>{property.beds} beds</span>
        <span>·</span>
        <span>{property.baths} bath</span>
      </div>
      <p className="mb-4">{property.description}</p>
      <h3 className="text-xl font-semibold mb-2">What this place offers</h3>
      <ul className="grid grid-cols-2 gap-2">
        {property.amenities.map((amenity, index) => (
          <li key={index}>{amenity}</li>
        ))}
      </ul>
    </div>
  );
};

export default PropertyDetails;