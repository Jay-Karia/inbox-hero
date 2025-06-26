import Image from "next/image";

export default function Logo() {
  return (
    <div className="flex justify-center items-center">
        <Image
          src="/email-mask.png"
          alt="Logo"
          width={40}
          height={40}
          className="relative z-10"
        />
      <span className="font-bold text-lg tracking-tight text-white">
        Inbox Hero
      </span>
    </div>
  );
}
