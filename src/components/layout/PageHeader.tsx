import { tv } from "tailwind-variants";

const pageHeaderStyles = tv({
  slots: {
    container: "border-b border-gray-300 bg-white px-4 py-3",
    content: "flex items-center justify-between",
    left: "flex flex-col gap-0.5",
    title: "text-xl font-semibold text-gray-900",
    description: "text-xs text-gray-500",
    right: "flex items-center gap-2",
  },
});

const styles = pageHeaderStyles();

interface Props {
  title: string;
  description?: string;
  actions?: React.ReactNode;
}

export const PageHeader = ({ title, description, actions }: Props) => {
  return (
    <div className={styles.container()}>
      <div className={styles.content()}>
        <div className={styles.left()}>
          <h1 className={styles.title()}>{title}</h1>
          {description && <p className={styles.description()}>{description}</p>}
        </div>
        {actions && <div className={styles.right()}>{actions}</div>}
      </div>
    </div>
  );
};
