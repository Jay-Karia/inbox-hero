import { Card, CardContent, CardHeader } from "../ui/card";

export default function StartSessionSkeleton() {
  return (
    <Card className="lg:col-span-2 bg-gradient-to-br from-gray-900/30 to-black/30 border-gray-700/50">
      <CardHeader>
        <div className="flex items-center gap-2 mb-2">
          <div className="h-5 w-5 bg-gray-700 rounded animate-pulse"></div>
          <div className="h-6 bg-gray-700 rounded w-48 animate-pulse"></div>
        </div>
        <div className="h-4 bg-gray-700 rounded w-72 animate-pulse"></div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Progress skeleton */}
        <div className="space-y-2">
          <div className="flex justify-between">
            <div className="h-4 bg-gray-700 rounded w-32 animate-pulse"></div>
            <div className="h-4 bg-gray-700 rounded w-10 animate-pulse"></div>
          </div>
          <div className="h-2 bg-gray-700 rounded w-full animate-pulse"></div>
        </div>
        {/* Button skeleton */}
        <div className="h-12 bg-gray-700 rounded-lg w-full animate-pulse"></div>
      </CardContent>
    </Card>
  );
}
