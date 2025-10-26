import {
  Checkbox as AriaCheckbox,
  type CheckboxProps as AriaCheckboxProps,
} from "react-aria-components";

export const Checkbox = (props: AriaCheckboxProps) => {
  return (
    <AriaCheckbox {...props} className="flex items-center gap-2 group">
      {({ isSelected }) => (
        <>
          <div
            className={[
              "w-4 h-4 rounded border-2 flex items-center justify-center transition-all",
              isSelected ? "bg-black border-black" : "bg-white border-gray-300",
            ].join(" ")}
          >
            {isSelected && (
              <svg
                className="w-3 h-3 text-white"
                viewBox="0 0 12 10"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M1 5L4.5 8.5L11 1.5" />
              </svg>
            )}
          </div>
        </>
      )}
    </AriaCheckbox>
  );
};
