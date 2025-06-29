import { Card, CardContent, CardHeader } from "./card";

export default function StatCardSkeleton({
  className,
}: {
  className?: string;
}) {
  return (
    <Card className={`border-none p-0 h-max ${className}`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-20">
        <div className="h-4 bg-gray-700 rounded w-24 animate-pulse"></div>
        <div className="h-4 w-4 bg-gray-700 rounded animate-pulse"></div>
      </CardHeader>
      <CardContent className="relative z-20">
        <div className="h-8 bg-gray-700 rounded w-16 mb-2 animate-pulse"></div>
        <div className="h-3 bg-gray-700 rounded w-20 animate-pulse"></div>
      </CardContent>
    </Card>
  );
}
