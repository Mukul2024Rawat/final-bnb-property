"use client"
import { useEffect, useState } from 'react';
import { FaLocationDot } from "react-icons/fa6";
import { fetchLocationSuggestions } from './utils/fetchLocation';
import { LocationValue } from '@/types/searchbar';
import { useDispatch } from 'react-redux';
import { setLocationValue } from '@/store/slices/searchSlice';

interface LocationModalsProps {
  closeModal: () => void;
  inputValue: string;
  setInputValue: (value: string) => void;
  
}

function LocationModals({ closeModal, inputValue, setInputValue }: LocationModalsProps) {
  const dispatch = useDispatch();
  const [suggestions, setSuggestions] = useState<LocationValue[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (inputValue.length > 2) {
        setIsLoading(true);
        try {
          const results = await fetchLocationSuggestions(inputValue);
          setSuggestions([
            {
              
              display_name: 'USA',
              name: 'USA',
              lat: '37.0902',
              lon: '-95.7129'
            },
            ...results
          ]);
        } catch (error) {
          console.error('Error fetching suggestions:', error);
          setSuggestions([
            {
              display_name: 'USA',
              name: 'USA',
              lat: '37.0902',
              lon: '-95.7129'
            }
          ]);
        } finally {
          setIsLoading(false);
        }
      } else {
        setSuggestions([{
          display_name: 'USA',
          name: 'USA',
          lat: '37.0902',
          lon: '-95.7129'
        }]);
      }
    };

    const timeoutId = setTimeout(fetchSuggestions, 800);
    return () => clearTimeout(timeoutId);
  }, [inputValue]);

  const handleInsertValue = ( e: React.MouseEvent,suggestion: Partial<LocationValue>) => {
    e.stopPropagation();
    dispatch(setLocationValue(suggestion));
    closeModal();
  };

  return (
    <div className="absolute h-auto w-[25vw] top-[150%] left-[-5%] rounded-lg p-5 shadow-xl bg-slate-200">
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        suggestions.slice(0, 4).map((suggestion,index) => (
          <div onClick={(e) => handleInsertValue(e,suggestion)} key={index} className="suggestList flex items-center gap-3 mb-1">
            <div className="iconMap px-1 py-2 bg-black rounded-lg">
              <FaLocationDot size={29} />
            </div>
            <div className="areaname text-black text-base">{suggestion.display_name}</div>
          </div>
        ))
      )}
    </div>
  );
}

export default LocationModals;