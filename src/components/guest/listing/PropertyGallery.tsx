import React from 'react';
import Image from 'next/image';

interface PropertyGalleryProps {
  images: string[];
}

const PropertyGallery: React.FC<PropertyGalleryProps> = ({ images }) => {
  return (
    <div className="grid grid-cols-4 gap-2">
      {images.map((src, index) => (
        <div key={index} className={index === 0 ? 'col-span-2 row-span-2' : ''}>
          <Image src={src} alt={`Property image ${index + 1}`} width={500} height={300} className="rounded-lg w-full h-full" />
        </div>
      ))}
    </div>
  );
};

export default PropertyGallery;