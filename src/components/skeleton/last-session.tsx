import { Card, CardContent, CardHeader } from "../ui/card";

export default function LastSessionSkeleton() {
  return (
    <Card className="bg-gray-900/50 border-gray-700">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-2 mb-2">
          <div className="h-5 w-5 bg-gray-700 rounded animate-pulse"></div>
          <div className="h-5 bg-gray-700 rounded w-24 animate-pulse"></div>
        </div>
        <div className="h-4 bg-gray-700 rounded w-32 animate-pulse"></div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="h-4 bg-gray-700 rounded w-full animate-pulse"></div>
        <div className="h-4 bg-gray-700 rounded w-3/4 animate-pulse"></div>
        <div className="space-y-2">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-12 bg-gray-700/30 rounded-lg animate-pulse"
            ></div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
