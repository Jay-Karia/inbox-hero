import Image from "next/image";

export default function Logo() {
  return (
    <div className="flex gap-3 justify-center items-center">
        <Image
          src="/email.png"
          alt="Logo"
          width={28}
          height={28}
          className="relative z-10"
        />
      <span className="font-bold text-lg tracking-tight text-white">
        Inbox Hero
      </span>
    </div>
  );
}
