import {
  Button as AriaButton,
  type ButtonProps as AriaButtonProps,
  composeRenderProps,
} from "react-aria-components";
import { tv } from "tailwind-variants";

const buttonStyles = tv({
  base: [
    "inline-flex items-center justify-center gap-2 rounded-md",
    "text-sm font-medium transition-colors",
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2",
    "disabled:opacity-50 disabled:cursor-not-allowed",
  ],
  variants: {
    variant: {
      primary: "bg-black text-white hover:bg-gray-800 border border-black",
      secondary: "bg-white text-black border border-gray-300 hover:bg-gray-50",
      ghost: "hover:bg-gray-100 border border-transparent",
      danger: "bg-red-600 text-white hover:bg-red-700 border border-red-600",
    },
    size: {
      sm: "px-2 py-1 text-xs",
      md: "px-4 py-2 text-sm",
      lg: "px-6 py-3 text-base",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "md",
  },
});

interface Props extends AriaButtonProps {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
}

export const Button = ({ variant, size, ...props }: Props) => {
  return (
    <AriaButton
      {...props}
      className={composeRenderProps(props.className, (className) =>
        buttonStyles({ variant, size, className })
      )}
    />
  );
};
