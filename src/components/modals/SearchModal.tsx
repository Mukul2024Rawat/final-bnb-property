"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";
import Modal from "./Modal";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [destination, setDestination] = useState<string>("");
  const [dates, setDates] = useState<string>("");
  const [guests, setGuests] = useState<string>("");

  const handleDestinationChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDestination(e.target.value);
  };

  const handleDatesChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDates(e.target.value);
  };

  const handleGuestsChange = (e: ChangeEvent<HTMLInputElement>) => {
    setGuests(e.target.value);
  };

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    // Implement search functionality here
    onClose();
  };

  const handleClear = () => {
    setDestination("");
    setDates("");
    setGuests("");
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <div>
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="destination">
          Where to?
        </label>
        <input
          type="text"
          id="destination"
          value={destination}
          onChange={handleDestinationChange}
          placeholder="Search destinations"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
        />
      </div>
      <div>
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="dates">
          When
        </label>
        <input
          type="text"
          id="dates"
          value={dates}
          onChange={handleDatesChange}
          placeholder="Add dates"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
        />
      </div>
      <div>
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="guests">
          Who
        </label>
        <input
          type="text"
          id="guests"
          value={guests}
          onChange={handleGuestsChange}
          placeholder="Add guests"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
        />
      </div>
    </div>
  );

  const footerContent = (
    <div className="flex justify-center">
      <button onClick={handleClear} className="text-gray-500 hover:text-gray-700">
        Clear all
      </button>
    </div>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSearch}
      title="Search"
      body={bodyContent}
      actionLabel="Search"
      footer={footerContent}
      disabled={false}
    />
  );
};

export default SearchModal;
