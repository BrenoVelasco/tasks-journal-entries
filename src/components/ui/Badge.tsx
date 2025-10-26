import { tv } from "tailwind-variants";

const badgeStyles = tv({
  base: [
    "inline-flex items-center justify-center px-2 py-0.5",
    "text-xs font-medium rounded border",
  ],
  variants: {
    variant: {
      default: "bg-gray-100 text-gray-800 border-gray-200",
      success: "bg-green-50 text-green-800 border-green-200",
      warning: "bg-yellow-50 text-yellow-800 border-yellow-200",
      danger: "bg-red-50 text-red-800 border-red-200",
      info: "bg-blue-50 text-blue-800 border-blue-200",
      pending: "bg-gray-50 text-gray-600 border-gray-200",
      running: "bg-blue-50 text-blue-700 border-blue-200",
      completed: "bg-green-50 text-green-700 border-green-200",
      failed: "bg-red-50 text-red-700 border-red-200",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

interface Props extends React.HTMLAttributes<HTMLSpanElement> {
  variant?:
    | "default"
    | "success"
    | "warning"
    | "danger"
    | "info"
    | "pending"
    | "running"
    | "completed"
    | "failed";
  children: React.ReactNode;
}

export const Badge = ({ variant, className, children, ...props }: Props) => {
  return (
    <span {...props} className={badgeStyles({ variant, className })}>
      {children}
    </span>
  );
};
