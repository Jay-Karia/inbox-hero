import { Separator } from "../ui/separator";

export default function TriageSkeleton() {
  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto animate-pulse">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="h-32 bg-gray-700 rounded-lg"></div>
          <div className="h-32 bg-gray-700 rounded-lg"></div>
          <div className="h-32 bg-gray-700 rounded-lg"></div>
        </div>
        <Separator className="my-8 bg-gray-800" />
        {/* Main grid layout - QuickSettings and StartSession */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* QuickSettings skeleton */}
          <div className="bg-gray-800/50 rounded-xl p-6 space-y-6">
            {/* Header */}
            <div className="flex items-center gap-3 mb-4">
              <div className="h-8 w-8 bg-gray-700 rounded-lg"></div>
              <div className="h-6 bg-gray-700 rounded w-32"></div>
            </div>

            {/* Sliders */}
            <div className="space-y-6">
              <div className="space-y-3">
                <div className="h-4 bg-gray-700 rounded w-40"></div>
                <div className="h-6 bg-gray-700 rounded w-full"></div>
                <div className="flex justify-between">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-3 bg-gray-700 rounded w-8"></div>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <div className="h-4 bg-gray-700 rounded w-36"></div>
                <div className="h-6 bg-gray-700 rounded w-full"></div>
                <div className="flex justify-between">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-3 bg-gray-700 rounded w-8"></div>
                  ))}
                </div>
              </div>
            </div>

            {/* Separator */}
            <div className="h-px bg-gray-600 w-full"></div>

            {/* Toggle switches */}
            <div className="space-y-3">
              {/* <div className="h-4 bg-gray-700 rounded w-24"></div> */}
              <div className="grid grid-cols-1 gap-3">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-3 bg-gray-800/40 rounded-lg"
                  >
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-4 bg-gray-700 rounded"></div>
                      <div className="h-4 bg-gray-700 rounded w-24"></div>
                    </div>
                    <div className="h-6 w-11 bg-gray-700 rounded-full"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* StartSession skeleton */}
          <div className="bg-gray-800/50 rounded-xl p-6 space-y-6">
            {/* Header */}
            <div className="flex items-center gap-3 mb-4">
              <div className="h-8 w-8 bg-gray-700 rounded-lg"></div>
              <div className="h-6 bg-gray-700 rounded w-36"></div>
            </div>

            {/* Session preview */}
            <div className="p-4 bg-gray-800/30 rounded-lg space-y-4">
              <div className="h-5 bg-gray-700 rounded w-32"></div>
              <div className="grid grid-cols-2 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex justify-between">
                    <div className="h-4 bg-gray-700 rounded w-16"></div>
                    <div className="h-4 bg-gray-700 rounded w-12"></div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick presets */}
            <div className="space-y-3">
              <div className="h-4 bg-gray-700 rounded w-24"></div>
              <div className="grid grid-cols-1 gap-2">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="bg-gray-800/30 rounded-lg p-3 flex items-center gap-3"
                  >
                    <div className="h-4 w-4 bg-gray-700 rounded"></div>
                    <div className="space-y-1">
                      <div className="h-4 bg-gray-700 rounded w-24"></div>
                      <div className="h-3 bg-gray-700 rounded w-20"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Start button */}
            <div className="h-12 bg-gray-700 rounded-lg w-full"></div>
          </div>
        </div>

        {/* AllSessions skeleton */}
        <div className="space-y-6">
          {/* Section header */}
          <div className="flex items-center justify-between">
            <div className="h-6 bg-gray-700 rounded w-32"></div>
            <div className="h-8 bg-gray-700 rounded w-20"></div>
          </div>

          {/* Sessions grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-gray-800/50 rounded-xl p-6 space-y-4">
                {/* Session header */}
                <div className="flex items-center justify-between">
                  <div className="h-5 bg-gray-700 rounded w-24"></div>
                  <div className="h-6 bg-gray-700 rounded w-16"></div>
                </div>

                {/* Session stats */}
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <div className="h-4 bg-gray-700 rounded w-16"></div>
                    <div className="h-4 bg-gray-700 rounded w-8"></div>
                  </div>
                  <div className="flex justify-between">
                    <div className="h-4 bg-gray-700 rounded w-20"></div>
                    <div className="h-4 bg-gray-700 rounded w-12"></div>
                  </div>
                  <div className="flex justify-between">
                    <div className="h-4 bg-gray-700 rounded w-14"></div>
                    <div className="h-4 bg-gray-700 rounded w-10"></div>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <div className="h-3 bg-gray-700 rounded w-12"></div>
                    <div className="h-3 bg-gray-700 rounded w-8"></div>
                  </div>
                  <div className="w-full bg-gray-700/50 rounded-full h-2">
                    <div
                      className="h-2 bg-gray-600 rounded-full"
                      style={{ width: "70%" }}
                    ></div>
                  </div>
                </div>

                {/* Session date */}
                <div className="h-3 bg-gray-700 rounded w-20"></div>
              </div>
            ))}
          </div>

          {/* Load more button */}
          <div className="text-center">
            <div className="h-10 bg-gray-700 rounded w-32 mx-auto"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
