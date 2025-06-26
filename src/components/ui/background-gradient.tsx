"use client";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

export const BackgroundGradient = ({
  gradientBackgroundStart = "rgb(108, 0, 162)",
  gradientBackgroundEnd = "rgb(0, 17, 82)",
  thirdColor = "0, 197, 255",
  fourthColor = "255, 0, 255", // Bright magenta
  fifthColor = "255, 255, 3",
  sixthColor = "0, 255, 127", // Bright green
  seventhColor = "255, 165, 0", // Orange
  eighthColor = "147, 0, 211", // Purple
  pointerColor = "140, 100, 255",
  size = "85%",
  blendingValue = "screen", // Changed to screen for brighter glow
  children,
  className,
  containerClassName,
}: {
  gradientBackgroundStart?: string;
  gradientBackgroundEnd?: string;
  firstColor?: string;
  secondColor?: string;
  thirdColor?: string;
  fourthColor?: string;
  fifthColor?: string;
  sixthColor?: string;
  seventhColor?: string;
  eighthColor?: string;
  pointerColor?: string;
  size?: string;
  blendingValue?: string;
  children?: React.ReactNode;
  className?: string;
  interactive?: boolean;
  containerClassName?: string;
}) => {
  useEffect(() => {
    document.body.style.setProperty(
      "--gradient-background-start",
      gradientBackgroundStart
    );
    document.body.style.setProperty(
      "--gradient-background-end",
      gradientBackgroundEnd
    );
    document.body.style.setProperty("--third-color", thirdColor);
    document.body.style.setProperty("--fourth-color", fourthColor);
    document.body.style.setProperty("--fifth-color", fifthColor);
    document.body.style.setProperty("--sixth-color", sixthColor);
    document.body.style.setProperty("--seventh-color", seventhColor);
    document.body.style.setProperty("--eighth-color", eighthColor);
    document.body.style.setProperty("--pointer-color", pointerColor);
    document.body.style.setProperty("--size", size);
    document.body.style.setProperty("--blending-value", blendingValue);
  }, [
    blendingValue,
    fifthColor,
    fourthColor,
    gradientBackgroundEnd,
    gradientBackgroundStart,
    pointerColor,
    size,
    sixthColor,
    seventhColor,
    eighthColor,
    thirdColor,
  ]);

  const [isSafari, setIsSafari] = useState(false);
  useEffect(() => {
    setIsSafari(/^((?!chrome|android).)*safari/i.test(navigator.userAgent));
  }, []);

  return (
    <div
      className={cn(
        "h-full w-full max-w-[2000px] mx-auto relative overflow-hidden",
        containerClassName
      )}
    >
      <svg>
        <defs>
          <filter id="blurMe">
            <feGaussianBlur
              in="SourceGraphic"
              stdDeviation="10"
              result="blur"
            />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8"
              result="goo"
            />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>
      <div className={cn("relative z-10", className)}>{children}</div>
      <div
        className={cn(
          "gradients-container h-full w-full blur-lg flex justify-center items-center",
          isSafari ? "blur-2xl" : "[filter:url(#blurMe)_blur(40px)]"
        )}
        style={{
          position: "absolute",
          inset: "0",
        }}
      >
        <div
          className={cn(
            `absolute [background:radial-gradient(circle_at_center,_rgba(var(--third-color),_0.9)_0,_rgba(var(--third-color),_0)_55%)_no-repeat]`,
            `[mix-blend-mode:var(--blending-value)] w-[var(--size)] h-[var(--size)] top-[calc(100%-var(--size)/2)] left-[calc(50%-var(--size)/2)]`,
            `[transform-origin:calc(50%+400px)]`,
            `animate-third animate-glow`,
            `opacity-90`
          )}
        ></div>
        <div
          className={cn(
            `absolute [background:radial-gradient(circle_at_center,_rgba(var(--sixth-color),_0.9)_0,_rgba(var(--fifth-color),_0)_45%)_no-repeat]`,
            `[mix-blend-mode:var(--blending-value)] w-[var(--size)] h-[var(--size)] top-[calc(110%-var(--size)/2)] left-[calc(50%-var(--size)/2)]`,
            `[transform-origin:calc(50%-800px)_calc(50%+800px)]`,
            `animate-fifth animate-glow`,
            `opacity-90`
          )}
        ></div>
        <div
          className={cn(
            `absolute [background:radial-gradient(circle_at_center,_rgba(var(--fourth-color),_0.8)_0,_rgba(var(--fifth-color),_0)_40%)_no-repeat]`,
            `[mix-blend-mode:var(--blending-value)] w-[var(--size)] h-[var(--size)] top-[calc(110%-var(--size)/2)] left-[calc(50%-var(--size)/2)]`,
            `[transform-origin:calc(50%-800px)_calc(50%+800px)]`,
            `animate-fifth animate-glow`,
            `opacity-80`
          )}
        ></div>

      </div>
    </div>
  );
};
