/* eslint-disable @typescript-eslint/no-explicit-any */

import { twMerge } from "tailwind-merge";

const Button = ({
  text,
  icon,
  onClick,
  variant,
  className,
  ...props
}: React.ComponentProps<"button"> & {
  text: string;
  icon?:any
  variant: "primary" | "outline" | "shadow";
}) => {
  const Icon=icon;
  const primary =
    "bg-primary hover:bg-primary/50 disabled:bg-gray-cold/70 text-text-accent";

  const outline =
    "border-primary text-primary font-semibold border-2 hover:text-primary/50 hover:border-primary/50 disabled:border-gray-cold/70 disabled:text-gray-cold/70";

  const shadow =
    "bg-gray-hot/50 border border-gray-cold/20 text-gray-700 font-semibold hover:bg-gray-hot/30 disabled:text-gray-cold/70";
  const variantObject = { primary, outline, shadow };
  return (
    <button
      {...props}
      className={twMerge(
        "rounded text-lg p-1 cursor-pointer disabled:cursor-not-allowed ",
        variantObject[variant] || primary,
        className
      )}
      onClick={onClick}
    >
{icon&&<Icon className="w-5 h-5" />}
      {text}
    </button>
  );
};

export default Button;
