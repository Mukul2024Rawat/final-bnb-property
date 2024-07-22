import React, { useState } from 'react';
import { Property } from '@/types/PropertyDetails';
import { api } from '@/api/index';

interface PropertyDetailsModalProps {
  property: Property;
  isOpen: boolean;
  onClose: () => void;
}

const PropertyDetailsModal: React.FC<PropertyDetailsModalProps> = ({ property, isOpen, onClose }) => {
  if (!isOpen) return null;

  const [isEditing, setIsEditing] = useState(false);
  const [priceDetails, setPriceDetails] = useState({
    ...property.property_price,
    price: Number(property.property_price.price),
    cleaning_fee: Number(property.property_price.cleaning_fee),
    service_fee: Number(property.property_price.service_fee),
    tax: Number(property.property_price.tax),
    daily_discount: Number(property.property_price.daily_discount),
    weekly_discount: Number(property.property_price.weekly_discount)
  });

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPriceDetails(prev => ({ ...prev, [name]: Number(value) }));
  };

  const handlePriceUpdate = async () => {
    try {
      const payload = {
        price: Number(priceDetails.price),
        cleaning_fee: Number(priceDetails.cleaning_fee),
        service_fee: Number(priceDetails.service_fee),
        tax: Number(priceDetails.tax),
        daily_discount: Number(priceDetails.daily_discount),
        weekly_discount: Number(priceDetails.weekly_discount)
      };

      await api.put(`/property/${property.id}/prices/${property.property_price.id}`, payload, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        }
      });
      setIsEditing(false);
      // You might want to update the main property state here or refetch the data
    } catch (error) {
      console.error('Error updating price:', error);
      // Handle error (e.g., show an error message to the user)
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
      <div className="bg-black bg-opacity-50 absolute inset-0" onClick={onClose}></div>
      <div className="bg-white rounded-lg shadow-xl z-50 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800">{property.title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition duration-150 ease-in-out"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="px-6 py-4">
          <p className="text-lg text-gray-600 mb-4">{property.subtitle}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Details</h3>
              <ul className="space-y-2 text-gray-600">
                <li><strong>Capacity:</strong> {property.capacity}</li>
                <li><strong>Booking Status:</strong> {property.is_booked ? 'Booked' : 'Available'}</li>
                <li><strong>Cancellation:</strong> {property.is_cancellable ? `Allowed (${property.cancellation_days} days)` : 'Not Allowed'}</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Location</h3>
              {property.property_address && (
                <p className="text-gray-600">
                  {`${property.property_address.locality}, ${property.property_address.city}, ${property.property_address.state}, ${property.property_address.country} - ${property.property_address.pincode}`}
                </p>
              )}
            </div>
          </div>

          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-2 text-gray-800">Pricing</h3>
            {isEditing ? (
              <div className="bg-gray-100 p-4 rounded-lg">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Price</label>
                    <input
                      type="number"
                      name="price"
                      value={priceDetails.price}
                      onChange={handlePriceChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Cleaning Fee</label>
                    <input
                      type="number"
                      name="cleaning_fee"
                      value={priceDetails.cleaning_fee}
                      onChange={handlePriceChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Service Fee</label>
                    <input
                      type="number"
                      name="service_fee"
                      value={priceDetails.service_fee}
                      onChange={handlePriceChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Tax</label>
                    <input
                      type="number"
                      name="tax"
                      value={priceDetails.tax}
                      onChange={handlePriceChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Daily Discount (%)</label>
                    <input
                      type="number"
                      name="daily_discount"
                      value={priceDetails.daily_discount}
                      onChange={handlePriceChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Weekly Discount (%)</label>
                    <input
                      type="number"
                      name="weekly_discount"
                      value={priceDetails.weekly_discount}
                      onChange={handlePriceChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                  </div>
                </div>
                <div className="mt-4 flex justify-end space-x-2">
                  <button
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition duration-150 ease-in-out"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handlePriceUpdate}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-150 ease-in-out"
                  >
                    Save
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-gray-100 p-4 rounded-lg">
                <div className="grid grid-cols-2 gap-4 text-gray-600">
                  <div><strong>Price:</strong> ${priceDetails.price}</div>
                  <div><strong>Cleaning Fee:</strong> ${priceDetails.cleaning_fee}</div>
                  <div><strong>Service Fee:</strong> ${priceDetails.service_fee}</div>
                  <div><strong>Tax:</strong> ${priceDetails.tax}</div>
                  <div><strong>Daily Discount:</strong> {priceDetails.daily_discount}%</div>
                  <div><strong>Weekly Discount:</strong> {priceDetails.weekly_discount}%</div>
                </div>
                <div className="mt-4 flex justify-end">
                  <button
                    onClick={() => setIsEditing(true)}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-150 ease-in-out"
                  >
                    Edit Prices
                  </button>
                </div>
              </div>
            )}
          </div>

          {property.property_amenities && property.property_amenities.length > 0 && (
            <div className="mt-6">
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Amenities</h3>
              <div className="flex flex-wrap gap-2">
                {property.property_amenities.map((amenity) => (
                  <span key={amenity.id} className="px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-sm">
                    {amenity.amenity.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {property.property_images && property.property_images.length > 0 && (
            <div className="mt-6">
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Images</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {property.property_images.map((image, index) => (
                  <div key={index} className="relative aspect-w-16 aspect-h-9">
                    <img
                      src={image.image}
                      alt={`Property Image ${index + 1}`}
                      className="object-cover rounded-lg shadow-md"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PropertyDetailsModal;