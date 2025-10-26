import {
  Input as AriaInput,
  Label as AriaLabel,
  TextField as AriaTextField,
  type InputProps as AriaInputProps,
  type LabelProps as AriaLabelProps,
  type TextFieldProps as AriaTextFieldProps,
  FieldError,
  Text,
  composeRenderProps,
} from "react-aria-components";
import { tv } from "tailwind-variants";

const inputStyles = tv({
  slots: {
    container: "flex flex-col gap-1",
    label: "text-sm font-medium text-gray-900",
    input: [
      "w-full px-3 py-2 rounded-md border border-gray-300",
      "text-sm text-gray-900 placeholder:text-gray-400",
      "focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent",
      "disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed",
      "transition-colors",
    ],
    description: "text-xs text-gray-500",
    error: "text-xs text-red-600",
  },
  variants: {
    isInvalid: {
      true: {
        input: "border-red-500 focus:ring-red-500",
      },
    },
  },
});

const styles = inputStyles();

interface Props extends AriaTextFieldProps {
  label?: string;
  description?: string;
  errorMessage?: string;
}

export const TextField = ({
  label,
  description,
  errorMessage,
  ...props
}: Props) => {
  return (
    <AriaTextField {...props} className={styles.container()}>
      {label && <Label>{label}</Label>}
      <Input />
      {description && <Text slot="description">{description}</Text>}
      {errorMessage && <FieldError>{errorMessage}</FieldError>}
    </AriaTextField>
  );
};

export const Label = (props: AriaLabelProps) => {
  return <AriaLabel {...props} className={styles.label()} />;
};

export const Input = (props: AriaInputProps) => {
  return (
    <AriaInput
      {...props}
      className={composeRenderProps(props.className, (className) =>
        styles.input({ className })
      )}
    />
  );
};
