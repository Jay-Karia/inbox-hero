import Image from "next/image";

export default function Logo() {
  return (
    <div className="flex gap-2 justify-center items-center">
        <Image
          src="/logo.png"
          alt="Logo"
          width={30}
          height={30}
          className="relative z-10"
        />
      <span className="font-bold text-lg tracking-tight text-white">
        Inbox Hero
      </span>
    </div>
  );
}
