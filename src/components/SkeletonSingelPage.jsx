export default function SkeletonSingelPage() {
  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      {/* Breadcrumb */}
      <div className="px-[10%] pt-6 pb-2">
        <div className="h-3 w-48 bg-gray-200 rounded animate-pulse" />
      </div>

      <div className="px-[10%] mt-4 animate-pulse">
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 lg:p-10 flex flex-col lg:flex-row gap-10">
          {/* Image */}
          <div className="w-full lg:w-[45%] flex flex-col gap-4">
            <div className="w-full h-[36rem] bg-gray-100 rounded-2xl" />
            <div className="flex gap-3">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="w-16 h-16 bg-gray-100 rounded-xl" />
              ))}
            </div>
          </div>

          {/* Details */}
          <div className="flex-1 flex flex-col gap-5">
            <div className="h-4 bg-gray-100 rounded w-20" />
            <div className="h-8 bg-gray-100 rounded w-3/4" />
            <div className="h-10 bg-gray-100 rounded w-1/3" />
            <div className="h-px bg-gray-100" />
            <div className="flex flex-col gap-2">
              <div className="h-3 bg-gray-100 rounded w-full" />
              <div className="h-3 bg-gray-100 rounded w-5/6" />
              <div className="h-3 bg-gray-100 rounded w-4/6" />
            </div>
            <div className="h-px bg-gray-100" />
            <div className="flex gap-3">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="w-10 h-10 bg-gray-100 rounded-full" />
              ))}
            </div>
            <div className="h-12 bg-gray-100 rounded-xl w-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
