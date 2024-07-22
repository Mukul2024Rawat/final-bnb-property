"use client"

import type { NextPage } from 'next';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import PropertyDetailsModal from './PropertyDetailsModal';

import { Property } from '@/types/PropertyDetails';
import { api } from '@/api';

const Listings: NextPage = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await api.get('/property/host', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        const data = response.data;
        if (Array.isArray(data)) {
          setProperties(data);
        } else {
          console.error('Unexpected response data:', data);
          setProperties([]);
        }
      } catch (error) {
        console.error('Error fetching properties', error);
        setProperties([]);
      }
    };

    fetchProperties();
  }, []);

  const handleViewDetails = (property: Property) => {
    setSelectedProperty(property);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProperty(null);
  };

  const handleDelete = async (propertyId: string) => {
    try {
      await api.delete(`/property/${propertyId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      // Remove the deleted property from the state
      setProperties(properties.filter(property => property.id !== propertyId));
    } catch (error) {
      console.error('Error deleting property', error);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100 overflow-auto">
      <Head>
        <title>My Listings</title>
        <meta name="description" content="Air nb Host Listings" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
   
      <div className="flex-1">
        <div className="p-4 md:p-8">
          <h1 className="text-3xl font-bold mb-6 text-gray-800">My Listings</h1>
          {properties.length > 0 ? (
            <>
              {/* Table for larger screens */}
              <div className="hidden md:block overflow-x-auto">
                <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-lg">
                  <thead className="bg-gray-200 text-gray-700">
                    <tr>
                      <th className="py-3 px-4 text-left">Property ID</th>
                      <th className="py-3 px-4 text-left">Title</th>
                      <th className="py-3 px-4 text-left">Subtitle</th>
                      <th className="py-3 px-4 text-left">Address</th>
                      <th className="py-3 px-4 text-left">Price</th>
                      <th className="py-3 px-4 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {properties.map((property) => (
                      <tr key={property.id} className="border-b border-gray-200 hover:bg-gray-100">
                        <td className="py-3 px-4">{property.id}</td>
                        <td className="py-3 px-4">{property.title}</td>
                        <td className="py-3 px-4">{property.subtitle}</td>
                        <td className="py-3 px-4">
                          {property.property_address
                            ? `${property.property_address.city}, ${property.property_address.state}, ${property.property_address.country}`
                            : 'N/A'}
                        </td>
                        <td className="py-3 px-4">{property.property_price ? `$${property.property_price.price}` : 'N/A'}</td>
                        <td className="py-3 px-4 flex space-x-2">
                          <button
                            className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded-full transition duration-300"
                            onClick={() => handleViewDetails(property)}
                          >
                            View Details
                          </button>
                          <button
                            className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded-full transition duration-300"
                            onClick={() => handleDelete(property.id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Cards for smaller screens */}
              <div className="md:hidden space-y-4">
                {properties.map((property) => (
                  <div key={property.id} className="bg-white rounded-lg shadow-md p-4">
                    <h2 className="text-xl font-semibold mb-2">{property.title}</h2>
                    <p className="text-gray-600 mb-2">{property.subtitle}</p>
                    <p className="text-sm text-gray-500 mb-2">
                      {property.property_address
                        ? `${property.property_address.city}, ${property.property_address.state}, ${property.property_address.country}`
                        : 'N/A'}
                    </p>
                    <p className="text-lg font-bold mb-3">{property.property_price ? `$${property.property_price.price}` : 'N/A'}</p>
                    <button
                      className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-full transition duration-300"
                      onClick={() => handleViewDetails(property)}
                    >
                      View Details
                    </button>
                    <button
                      className="w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-full transition duration-300"
                      onClick={() => handleDelete(property.id)}
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <p className="text-gray-600 text-lg">No properties found.</p>
          )}
        </div>
      </div>
      {selectedProperty && (
        <PropertyDetailsModal
          property={selectedProperty}
          isOpen={isModalOpen}
          onClose={closeModal}
        />
      )}
    </div>
  );
};

export default Listings;
