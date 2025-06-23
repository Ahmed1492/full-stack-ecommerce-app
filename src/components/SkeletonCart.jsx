import React from "react";

const SkeletonCart = () => {
  return (
    <div className="min-w-[23rem]">
      <div className="mx-auto flex flex-col justify-between h-[5rem] rounded-lg   relative p-4">
        <div className="flex items-center gap-8 animate-pulse">
          {/* Image skeleton */}
          <div className="w-[6rem] h-[4rem] bg-gray-200 rounded-md"></div>

          {/* Text skeleton */}
          <div className="flex flex-col gap-3 flex-1">
            <div className="w-1/3 h-3 rounded bg-gray-200"></div>
            <div className="w-2/3 h-3 rounded bg-gray-200"></div>
            <div className="w-1/2 h-3 rounded bg-gray-200"></div>
          </div>
        </div>
      </div>
      <div className="mx-auto flex flex-col justify-between h-[5rem] rounded-lg   relative p-4">
        <div className="flex items-center gap-8 animate-pulse">
          {/* Image skeleton */}
          <div className="w-[6rem] h-[4rem] bg-gray-200 rounded-md"></div>

          {/* Text skeleton */}
          <div className="flex flex-col gap-3 flex-1">
            <div className="w-1/3 h-3 rounded bg-gray-200"></div>
            <div className="w-2/3 h-3 rounded bg-gray-200"></div>
            <div className="w-1/2 h-3 rounded bg-gray-200"></div>
          </div>
        </div>
      </div>
      <div className="mx-auto flex flex-col justify-between h-[5rem] rounded-lg   relative p-4">
        <div className="flex items-center gap-8 animate-pulse">
          {/* Image skeleton */}
          <div className="w-[6rem] h-[4rem] bg-gray-200 rounded-md"></div>

          {/* Text skeleton */}
          <div className="flex flex-col gap-3 flex-1">
            <div className="w-1/3 h-3 rounded bg-gray-200"></div>
            <div className="w-2/3 h-3 rounded bg-gray-200"></div>
            <div className="w-1/2 h-3 rounded bg-gray-200"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonCart;
