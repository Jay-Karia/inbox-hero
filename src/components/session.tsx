import { type Session } from "../../generated/prisma";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { FaClock, FaArchive, FaTrash, FaForward } from "react-icons/fa";

interface SessionProps {
  session: Session;
}

export default function Session({ session }: SessionProps) {

  return (
    <Card className="bg-gray-800 border border-gray-700 rounded-lg shadow-md">

    </Card>
  );
}
