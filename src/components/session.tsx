import { type Session } from "../../generated/prisma";

interface SessionProps {
  session: Session;
}

export default function Session({ session }: SessionProps) {
  return <>{JSON.stringify(session)}</>;
}
