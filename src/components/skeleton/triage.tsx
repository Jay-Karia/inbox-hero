export default function TriageSkeleton() {
  return (
    <div className="min-h-screen">
      <div className="max-w-6xl mx-auto space-y-8 animate-pulse">
        <div className="text-center space-y-4">
          <div className="h-10 bg-gray-700 rounded w-96 mx-auto"></div>
          <div className="h-6 bg-gray-700 rounded w-80 mx-auto"></div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="bg-gray-800 rounded-xl p-6 space-y-4">
            <div className="h-6 bg-gray-700 rounded w-3/4"></div>
            <div className="space-y-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-4 bg-gray-700 rounded"></div>
              ))}
            </div>
          </div>
          <div className="lg:col-span-2 bg-gray-800 rounded-xl p-6 space-y-6">
            <div className="h-6 bg-gray-700 rounded w-1/2"></div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="h-4 bg-gray-700 rounded"></div>
                <div className="h-8 bg-gray-700 rounded"></div>
              </div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-700 rounded"></div>
                <div className="h-8 bg-gray-700 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
