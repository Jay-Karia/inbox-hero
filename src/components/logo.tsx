import Image from "next/image";
import localFont from "next/font/local";

const robotoCondensed = localFont({
  src: "../fonts/Roboto_Condensed/static/RobotoCondensed-Regular.ttf",
});

export default function Logo() {
  return (
    <div className={`${robotoCondensed.className} flex gap-2 justify-center items-center cursor-pointer`}>
        <Image
          src="/logo-trans.png"
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
