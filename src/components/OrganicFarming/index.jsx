import React from "react";
import { Leaf } from "lucide-react";
import OrganicFarmingPrinciples from "./OrganicFarmingPrinciples";
import OrganicFarmingProcess from "./OrganicFarmingProcess";
import CropBestPractices from "./CropBestPractices";
import SuccessStoryAndResources from "./SuccessStoryAndResources";

export default function index() {
  return (
    <>
      <div className="min-h-[40vh] flex flex-col justify-center items-center bg-white px-6 py-12 text-center">
        
        <h1 className="text-3xl md:text-4xl font-extrabold text-green-700 flex items-center gap-3 mb-4">
          <Leaf className="w-8 h-8 text-green-600" />
          Organic Farming Excellence
        </h1>

        
        <p className="text-gray-700 text-lg md:text-xl max-w-3xl leading-relaxed">
          Discover sustainable agricultural practices that enhance soil health,
          preserve ecosystems, and produce premium quality crops through
          time-tested organic methods.
        </p>
      </div>

      <OrganicFarmingPrinciples/>
      <OrganicFarmingProcess/>
      <CropBestPractices/>
      <SuccessStoryAndResources/>
    </>
  );
}
