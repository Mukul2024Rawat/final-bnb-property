import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { setProperty } from "@/store/slices/formSlice";
import Footer from "./Footer";
import Header from "./Header";

const FloorPlanStep = ({ onNext, onBack }: { onNext: () => void; onBack: () => void }) => {
  const dispatch = useDispatch();
  const property = useSelector((state: RootState) => state.form.property);

  // State variables initialized with Redux state values...
  const [guests, setGuests] = useState<number>(property.capacity || 1);
  const [isAvailable, setIsAvailable] = useState<boolean>(property.is_available ?? true);
  const [isCancellable, setIsCancellable] = useState<boolean>(property.is_cancellable ?? true);
  const [cancellationDays] = useState<number>(1); // Set default value to 1
  const [error, setError] = useState<string>("");

  useEffect(() => {
    dispatch(
      setProperty({
        capacity: guests,
        is_available: isAvailable,
        is_cancellable: isCancellable,
        cancellation_days: cancellationDays,
      })
    );
  }, [guests, isAvailable, isCancellable, cancellationDays, dispatch]);

  const handleGuestsChange = (change: number) => {
    const newGuests = guests + change;
    if (newGuests >= 1) {
      setGuests(newGuests);
      dispatch(setProperty({ ...property, capacity: newGuests }));
    }
  };

  const handleIsAvailableChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked;
    setIsAvailable(isChecked);
    dispatch(setProperty({ ...property, is_available: isChecked }));
  };

  const handleIsCancellableChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked;
    setIsCancellable(isChecked);
    dispatch(setProperty({ ...property, is_cancellable: isChecked }));
  };

  // Assuming guests is the only mandatory field for completion
  const isComplete = guests > 0;

  return (
    <div className="flex flex-col min-h-screen bg-zinc-200">
      <Header />
      <main className="flex-grow flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-2xl">
          <h1 className="text-3xl font-bold mb-4">Share some basics about your place</h1>
          <p className="text-gray-600 mb-8">You&apos;ll add more details later</p>
          <div className="border-b border-gray-300 py-4">
            <div className="flex justify-between items-center">
              <span className="text-lg font-medium">Guests</span>
              <div className="flex items-center space-x-4">
                <button
                  className="h-8 w-8 flex items-center justify-center border-2 border-gray-300 rounded-full text-gray-500 hover:border-gray-400 hover:text-gray-600 transition-colors"
                  onClick={() => handleGuestsChange(-1)}
                  disabled={guests <= 1}
                >
                  -
                </button>
                <span className="text-xl font-semibold">{guests}</span>
                <button
                  className="h-8 w-8 flex items-center justify-center border-2 border-gray-300 rounded-full text-gray-500 hover:border-gray-400 hover:text-gray-600 transition-colors"
                  onClick={() => handleGuestsChange(1)}
                >
                  +
                </button>
              </div>
            </div>
          </div>
          <div className="mt-8">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="is-available"
                className="mr-2 h-4 w-4 focus:ring border-gray-300 rounded"
                checked={isAvailable}
                onChange={handleIsAvailableChange}
              />
              <label htmlFor="is-available" className="text-sm font-medium text-gray-700">
                Available for booking
              </label>
            </div>
            <div className="mt-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="is-cancellable"
                  className="mr-2 h-4 w-4 border-gray-300 rounded"
                  checked={isCancellable}
                  onChange={handleIsCancellableChange}
                />
                <label htmlFor="is-cancellable" className="text-sm font-medium text-gray-700">
                  Cancellable
                </label>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer onBack={onBack} onNext={onNext} isNextDisabled={!isComplete} />
    </div>
  );
};

export default FloorPlanStep;
