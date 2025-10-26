import { tv } from "tailwind-variants";

const emptyStateStyles = tv({
  slots: {
    container: "flex flex-col items-center justify-center py-12 px-4",
    icon: "text-gray-400 mb-4",
    title: "text-lg font-medium text-gray-900 mb-1",
    description: "text-sm text-gray-500 text-center mb-6",
    action: "mt-4",
  },
});

const styles = emptyStateStyles();

interface Props {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export const EmptyState = ({ icon, title, description, action }: Props) => {
  return (
    <div className={styles.container()}>
      {icon && <div className={styles.icon()}>{icon}</div>}
      <h3 className={styles.title()}>{title}</h3>
      {description && <p className={styles.description()}>{description}</p>}
      {action && <div className={styles.action()}>{action}</div>}
    </div>
  );
};
