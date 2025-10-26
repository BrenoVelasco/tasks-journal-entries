import { tv } from "tailwind-variants";

const pageContentStyles = tv({
  base: "flex-1 overflow-auto p-4",
});

interface Props {
  children: React.ReactNode;
  className?: string;
}

export const PageContent = ({ children, className }: Props) => {
  return <div className={pageContentStyles({ className })}>{children}</div>;
};
