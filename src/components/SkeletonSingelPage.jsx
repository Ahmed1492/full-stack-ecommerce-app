import React from "react";

export default function SkeletonSingelPage() {
  return (
    <div className="flex items-center justify-between w-[90%] flex-wrap m-auto   my-5">
      <div className="mx-auto flex justify-between  items-center gap-[3rem] w-full   h-[19rem]s rounded-lg border11 relative p-4">
        {/* Simulated image skeleton */}
        <div className="w-[34%] h-[30rem] bg-gray-200 rounded-md mb-4 animate-pulse"></div>

        {/* Text and avatar loading skeleton */}
        <div className="flex  w-[66%] animate-pulse space-x-4">
          <div className="w-full">
            <div className="flex-1 space-y-3 py-1">
              <div className="h-2 rounded w-[40%] bg-gray-200"></div>

              <div className="h-2 rounded bg-gray-200 w-3/4"></div>
              <div className="h-2 rounded bg-gray-200 w-3/4"></div>
              <div className="h-2 rounded bg-gray-200 w-3/4"></div>

              <div className="space-y-3">
                <div className="grid grid-cols-3 gap-4">
                  <div className="col-span-1 h-2 rounded bg-gray-200"></div>
                  {/* <div className="col-span-2 h-2 rounded bg-gray-200"></div> */}
                </div>
              </div>
            </div>
            <hr className="my-[2rem]" />
            <div className="flex-1 space-y-3 py-1">
              <div className="h-2 rounded w-[40%] bg-gray-200"></div>

              <div className="h-2 rounded bg-gray-200 w-3/4"></div>
              <div className="h-2 rounded bg-gray-200 w-3/4"></div>
              <div className="h-2 rounded bg-gray-200 w-3/4"></div>

              <div className="space-y-3">
                <div className="grid grid-cols-3 gap-4">
                  <div className="col-span-1 h-2 rounded bg-gray-200"></div>
                  {/* <div className="col-span-2 h-2 rounded bg-gray-200"></div> */}
                </div>
              </div>
            </div>
            <hr className="my-[2rem]" />
            <div className="flex-1 space-y-3 py-1">
              <div className="h-2 rounded w-[40%] bg-gray-200"></div>

              <div className="h-2 rounded bg-gray-200 w-3/4"></div>
              <div className="h-2 rounded bg-gray-200 w-3/4"></div>
              <div className="h-2 rounded bg-gray-200 w-3/4"></div>

              <div className="space-y-3">
                <div className="grid grid-cols-3 gap-4">
                  <div className="col-span-1 h-2 rounded bg-gray-200"></div>
                  {/* <div className="col-span-2 h-2 rounded bg-gray-200"></div> */}
                </div>
              </div>
            </div>
            <hr className="my-[2rem]" />
            <div className="flex-1 space-y-3 py-1">
              <div className="h-2 rounded w-[40%] bg-gray-200"></div>

              <div className="h-2 rounded bg-gray-200 w-3/4"></div>
              <div className="h-2 rounded bg-gray-200 w-3/4"></div>
              <div className="h-2 rounded bg-gray-200 w-3/4"></div>

              <div className="space-y-3">
                <div className="grid grid-cols-3 gap-4">
                  <div className="col-span-1 h-2 rounded bg-gray-200"></div>
                  {/* <div className="col-span-2 h-2 rounded bg-gray-200"></div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
