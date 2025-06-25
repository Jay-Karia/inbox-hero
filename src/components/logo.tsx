import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/">
      <div className="flex gap-2 justify-center items-center cursor-pointer hover:opacity-85 transition-opacity">
        <Image src="/email.png" alt="Logo" width={25} height={25} />
        <span className="">Inbox Hero</span>
      </div>
    </Link>
  );
}
