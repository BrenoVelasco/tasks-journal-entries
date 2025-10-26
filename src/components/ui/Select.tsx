import {
  Select as AriaSelect,
  Label as AriaLabel,
  Button,
  SelectValue,
  Popover,
  ListBox,
  ListBoxItem,
  type SelectProps as AriaSelectProps,
  type ListBoxItemProps,
  composeRenderProps,
} from "react-aria-components";
import { tv } from "tailwind-variants";

const selectStyles = tv({
  slots: {
    container: "flex flex-col gap-1",
    label: "text-sm font-medium text-gray-900",
    button: [
      "flex items-center justify-between gap-2 w-full px-3 py-2",
      "rounded-md border border-gray-300 bg-white",
      "text-sm text-gray-900",
      "focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent",
      "disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed",
      "transition-colors",
    ],
    value: "flex-1 text-left",
    icon: "text-gray-500",
    popover: [
      "bg-white rounded-md border border-gray-200 shadow-lg",
      "entering:animate-in entering:fade-in entering:zoom-in-95",
      "exiting:animate-out exiting:fade-out exiting:zoom-out-95",
      "overflow-auto max-h-60",
    ],
    listbox: "outline-none p-1",
    item: [
      "px-3 py-2 text-sm text-gray-900 rounded-md cursor-pointer",
      "outline-none",
      "focus:bg-gray-100",
      "selected:bg-gray-100 selected:font-medium",
    ],
  },
});

const styles = selectStyles();

interface Props<T extends object> extends Omit<AriaSelectProps<T>, "children"> {
  label?: string;
  children: React.ReactNode;
}

export const Select = <T extends object>({
  label,
  children,
  ...props
}: Props<T>) => {
  return (
    <AriaSelect {...props} className={styles.container()}>
      {label && <AriaLabel className={styles.label()}>{label}</AriaLabel>}
      <Button className={styles.button()}>
        <SelectValue className={styles.value()} />
        <span aria-hidden="true" className={styles.icon()}>
          ▼
        </span>
      </Button>
      <Popover className={styles.popover()}>
        <ListBox className={styles.listbox()}>{children}</ListBox>
      </Popover>
    </AriaSelect>
  );
};

export function SelectItem(props: ListBoxItemProps) {
  return (
    <ListBoxItem
      {...props}
      className={composeRenderProps(props.className, (className) =>
        styles.item({ className })
      )}
    />
  );
}
