import React from "react";
import Link from "next/link";
import Image from "next/image";

interface SocialButtonProps {
  /** The URL the button navigates to */
  href: string;
  /** The SVG path data (the 'd' attribute string) */
  icon: string;
  /** The Tailwind class for the background (gradient or color) shown on hover */
  hoverClass?: string;
  /** Target attribute (e.g., '_blank', '_self'). Defaults to '_blank' */
  target?: React.HTMLAttributeAnchorTarget;
  /** Optional extra classes for the container */
  className?: string;
}

const SocialButton: React.FC<SocialButtonProps> = ({
  href,
  icon,
  hoverClass,
  target = "_blank",
  className = "",
}) => {
  return (
    <Link
      href={href as any}
      target={target}
      rel={target === "_blank" ? "noopener noreferrer" : undefined}
      className={`
         relative flex group items-center justify-center
        w-12.5 h-12.5 aspect-square rounded-full border-none cursor-pointer 
        transition-transform active:scale-85 z-0 overflow-hidden
        ${hoverClass} 
        ${className}
      `}
    >
      {/* The Overlay: Dark background that shrinks on hover to reveal the gradient */}
      <span
        className="
          absolute -z-10
          w-12.5 aspect-square
          bg-primary-3-900
          rounded-full 
          transition-all duration-400 
          group-hover:w-0 
          top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
        "
      />
      <div className="w-6 aspect-square text-white z-10 transition-colors relative ">
        {/* The Icon */}
        <Image src={icon} alt="Icon" fill />
      </div>
    </Link>
  );
};

export default SocialButton;
