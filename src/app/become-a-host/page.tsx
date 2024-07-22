"use client";
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';



import GettingStarted from '@/components/become-a-host/GettingStarted';
const LocationStep = dynamic(() => import("@/components/become-a-host/Location"), {
  ssr: false,
});
import FloorPlanStep from '@/components/become-a-host/FloorPlan';
import AmenitiesStep from '@/components/become-a-host/Amenities';
import PhotosStep from '@/components/become-a-host/Photos';
import TitleStep from '@/components/become-a-host/Title';
import SubTitleStep from '@/components/become-a-host/SubTitle';
import DescriptionStep from '@/components/become-a-host/Description';
import PriceStep from '@/components/become-a-host/Price';
import DiscountStep from '@/components/become-a-host/Discount';
import TaxesStep from '@/components/become-a-host/Taxes';
import HostRulesStep from '@/components/become-a-host/HostRules';
import ReviewStep from '@/components/become-a-host/Review';
import dynamic from 'next/dynamic';

const BecomeAHost = () => {
  const dispatch = useDispatch();
  const form = useSelector((state: RootState) => state.form);
  const [step, setStep] = useState<number>(0);

  const nextStep = () => {
    setStep(prev => prev + 1);
  };

  const prevStep = () => {
    setStep(prev => prev - 1);
  };

 

  const steps = [
    <GettingStarted key="gettingStarted" onNext={nextStep} />,
    <LocationStep key="location" onNext={nextStep} onBack={prevStep} />,
    <FloorPlanStep key="floorPlan" onNext={nextStep} onBack={prevStep} />,
    <AmenitiesStep key="amenities" onNext={nextStep} onBack={prevStep} />,
    <PhotosStep key="photos" onNext={nextStep} onBack={prevStep} />,
    <TitleStep key="title" onNext={nextStep} onBack={prevStep} />,
    <SubTitleStep key="subTitle" onNext={nextStep} onBack={prevStep} />,
    <DescriptionStep key="description" onNext={nextStep} onBack={prevStep} />,
    <PriceStep key="price" onNext={nextStep} onBack={prevStep} />,
    <DiscountStep key="discount" onNext={nextStep} onBack={prevStep} />,
    <TaxesStep key="taxes" onNext={nextStep} onBack={prevStep} />,
    <HostRulesStep key="hostRules" onNext={nextStep} onBack={prevStep} />,
    <ReviewStep key="review"  onBack={prevStep} />,
  ];

  return (
    <div className="bg-white">

      {steps[step]}
    
    </div>
  );
};

export default BecomeAHost;
