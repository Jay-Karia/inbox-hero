export default function ActiveSessionSkeleton() {
  return (
    <div className="min-h-screen flex items-center justify-center animate-pulse">
      <div className="text-center animate-pulse">
        <div className="text-2xl text-gray-400 mb-4 w-24 h-8"></div>
        <div className="bg-gray-700 rounded-lg p-6 space-y-4">
          <div className="h-6 bg-gray-600 rounded w-64 mx-auto"></div>
          <div className="h-6 bg-gray-600 rounded w-48 mx-auto"></div>
          <div className="h-10 bg-gray-600 rounded w-32 mx-auto"></div>
        </div>
      </div>
    </div>
  );
}
