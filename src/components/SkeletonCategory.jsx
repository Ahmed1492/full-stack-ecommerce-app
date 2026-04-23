export default function SkeletonCategory() {
  return (
    <div className="px-[10%]">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 animate-pulse">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="flex flex-col items-center gap-3">
            <div className="w-full aspect-square rounded-2xl bg-gray-100" />
            <div className="h-3 bg-gray-100 rounded w-2/3" />
          </div>
        ))}
      </div>
    </div>
  );
}
