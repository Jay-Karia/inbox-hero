import { type Session } from "../../generated/prisma";
import { Card } from "./ui/card";

interface SessionProps {
  session: Session;
  index: number
}

export default function Session({ session, index }: SessionProps) {

  return (
    <Card className="bg-gray-800 border border-gray-700 rounded-lg shadow-md">

    </Card>
  );
}
