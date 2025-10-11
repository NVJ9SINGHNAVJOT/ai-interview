import { cn } from "@/utils/cn";
import {
  ComponentPropsWithoutRef,
  FC,
  forwardRef,
  InputHTMLAttributes,
  TextareaHTMLAttributes,
  useEffect,
  useRef,
  useState,
} from "react";
import { Controller } from "react-hook-form";

const readOnlyBg = "bg-[#F5F5F6]";

export const TextInput = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          "w-full px-3 h-12 rounded-lg border-solid border border-[#333] placeholder-neutral-100 outline-none bg-[#2b2b2b] text-[#f1f1f1] focus-within:border-[#2d79f3] transition-all ease-linear",
          props.readOnly ? readOnlyBg : "",
          className
        )}
        {...props}
      />
    );
  }
);
TextInput.displayName = "TextInput";

export const NumberInput = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  ({ className, onWheel, ...props }, ref) => {
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (["e", "E", "+", "-"].includes(e.key)) {
        e.preventDefault();
      }

      if (props.onKeyDown) props.onKeyDown(e);
    };

    const handleWheel = (e: React.WheelEvent<HTMLInputElement>) => {
      // prevent changing number on scroll
      e.currentTarget.blur();
      if (onWheel) onWheel(e);
    };

    return (
      <input
        ref={ref}
        type="number"
        className={cn(
          "w-full px-3 h-12 rounded-lg border-solid border border-[#333] placeholder-neutral-100 outline-none bg-[#2b2b2b] text-[#f1f1f1] focus-within:border-[#2d79f3] transition-all ease-linear",
          props.readOnly ? readOnlyBg : "",
          className
        )}
        onKeyDown={handleKeyDown}
        onWheel={handleWheel}
        {...props}
      />
    );
  }
);
NumberInput.displayName = "NumberInput";

interface Option {
  label: string;
  value: string;
}

interface SelectInputProps {
  options: Option[];
  value?: string;
  // eslint-disable-next-line no-unused-vars
  onChange?: (value: string) => void;
  name?: string;
  readOnly?: boolean;
  required?: boolean;
  placeholder?: string;
  className?: string;
  buttonClassName?: string;
  placeholderClassName?: string;
  dropdownClassName?: string;
  optionClassName?: string;
}

export const SelectInput = forwardRef<HTMLDivElement, SelectInputProps>(
  (
    {
      options,
      value,
      onChange,
      name,
      readOnly,
      required,
      placeholder = "Select",
      className,
      buttonClassName,
      placeholderClassName,
      dropdownClassName,
      optionClassName,
    },
    ref
  ) => {
    const [open, setOpen] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const selected = options.find((o) => o.value === value);

    const handleSelect = (val: string) => {
      if (readOnly) return;
      onChange?.(val);
      setOpen(false);
    };

    // Close dropdown when clicking outside
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
          setOpen(false);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, []);

    return (
      <div ref={wrapperRef} className={cn("relative", className)}>
        <div
          ref={ref}
          aria-haspopup="listbox"
          aria-expanded={open}
          className={cn(
            "w-full px-3 h-12 rounded-lg flex items-center justify-between border-solid border border-[#333] placeholder-neutral-100 outline-none bg-[#2b2b2b] text-[#f1f1f1] focus-within:border-[#2d79f3]",
            readOnly ? "cursor-not-allowed opacity-70" : "cursor-pointer",
            buttonClassName
          )}
          onClick={() => !readOnly && setOpen((v) => !v)}
          onKeyDown={(e) => {
            if (readOnly) return;
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              setOpen((v) => !v);
            } else if (e.key === "Escape") {
              setOpen(false);
            }
          }}
        >
          <div className={cn("truncate", placeholderClassName)}>{selected ? selected.label : placeholder}</div>
          <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M1 1.5L6 6.5L11 1.5"
              stroke="#2E2E2E"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {name && <input type="hidden" name={name} value={value ?? ""} required={required} readOnly={readOnly} />}

        {open && (
          <ul
            role="listbox"
            className={cn(
              "absolute z-10 mt-1 w-full max-h-60 overflow-auto rounded-lg shadow-lg focus:outline-none bg-white",
              dropdownClassName
            )}
          >
            {options.map((o) => {
              const isSelected = o.value === value;
              return (
                <li
                  key={o.value}
                  role="option"
                  aria-selected={isSelected}
                  className={cn(
                    "px-3 py-2 transition-all ease-linear text-sm text-neutral-700 hover:bg-[#e8e8e8] cursor-pointer",
                    isSelected && "bg-[#f2f2f2]",
                    optionClassName
                  )}
                  onClick={() => handleSelect(o.value)}
                >
                  {o.label}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    );
  }
);

SelectInput.displayName = "SelectInput";

interface PhoneInputProps extends InputHTMLAttributes<HTMLInputElement> {
  prefix?: string;
  prefixClassName?: string;
  inputWrapperClassName?: string;
}

export const PhoneInput = forwardRef<HTMLInputElement, PhoneInputProps>(
  ({ prefix = "+91", className, prefixClassName, inputWrapperClassName, ...props }, ref) => {
    return (
      <div className={cn("flex items-center", inputWrapperClassName)}>
        <span
          className={cn(
            "inline-flex items-center px-3 h-12 rounded-l-lg border-r-0 text-sm border-solid border border-[#333] placeholder-neutral-100 outline-none bg-[#2b2b2b] text-[#f1f1f1] focus-within:border-[#2d79f3]",
            prefixClassName
          )}
        >
          {prefix}
        </span>
        <input
          ref={ref}
          className={cn(
            "w-full px-3 h-12 rounded-r-lg border-solid border border-[#333] placeholder-neutral-100 outline-none bg-[#2b2b2b] text-[#f1f1f1] focus-within:border-[#2d79f3] transition-all ease-linear",
            props.readOnly ? readOnlyBg : "",
            className
          )}
          {...props}
        />
      </div>
    );
  }
);
PhoneInput.displayName = "PhoneInput";

export const TextArea = forwardRef<HTMLTextAreaElement, TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={cn(
          "w-full p-3 rounded-lg min-h-[100px] border-solid border border-[#333] placeholder-neutral-100 outline-none bg-[#2b2b2b] text-[#f1f1f1] focus-within:border-[#2d79f3] transition-all ease-linear",
          props.readOnly ? readOnlyBg : "",
          className
        )}
        {...props}
      />
    );
  }
);
TextArea.displayName = "TextArea";

interface CheckboxProps extends ComponentPropsWithoutRef<"input"> {
  className?: string;
}

export const CustomCheckbox = forwardRef<HTMLInputElement, CheckboxProps>(({ className, ...props }, ref) => {
  return (
    <input
      ref={ref}
      type="checkbox"
      className={cn(
        "w-5 h-5 m-0 border-border-light rounded appearance-none checked:bg-blue-600 checked:border-blue-600 border-solid border border-[#333] placeholder-neutral-100 outline-none bg-[#2b2b2b] text-[#f1f1f1] focus-within:border-[#2d79f3] transition-all ease-linear",
        props.readOnly ? readOnlyBg : "bg-white",
        className
      )}
      {...props}
    />
  );
});
CustomCheckbox.displayName = "CustomCheckbox";

interface CheckboxInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  labelClassName?: string;
  wrapperClassName?: string;
}

export const CheckboxInput = forwardRef<HTMLInputElement, CheckboxInputProps>(
  ({ label, className, labelClassName, wrapperClassName, ...props }, ref) => {
    return (
      <label className={cn("flex items-center space-x-[10px] cursor-pointer", wrapperClassName)}>
        <CustomCheckbox ref={ref} className={className} {...props} />
        {label && <span className={cn("text-neutral-700", labelClassName)}>{label}</span>}
      </label>
    );
  }
);
CheckboxInput.displayName = "CheckboxInput";

// Base properties for all form fields
interface BaseFormFieldProps {
  control: any;
  name: string;
  label?: string;
  placeholder?: string;
  readOnly?: boolean;
  required?: boolean;
  className?: string;
  inputClassName?: string;
  showError?: boolean;
  errorClassName?: string;
}

// Type-specific properties
interface SelectFieldProps {
  type: "select";
  options: Option[];
  buttonClassName?: string;
  placeholderClassName?: string;
  dropdownClassName?: string;
  optionClassName?: string;
}

interface PhoneFieldProps {
  type: "phone";
  prefix?: string;
  prefixClassName?: string;
  inputWrapperClassName?: string;
}

interface CheckboxFieldProps {
  type: "checkbox";
  labelClassName?: string;
  wrapperClassName?: string;
}

interface TextFieldProps {
  type: "text" | "email";
}

interface NumberFieldProps {
  type: "number";
}

interface TextAreaFieldProps {
  type: "textarea";
}

// Lax union to allow mapping arrays of mixed field configs without TS narrowing issues
type FormFieldProps = BaseFormFieldProps & {
  type: "select" | "phone" | "checkbox" | "text" | "email" | "number" | "textarea";
} & Partial<
    Omit<SelectFieldProps, "type"> &
      Omit<PhoneFieldProps, "type"> &
      Omit<CheckboxFieldProps, "type"> &
      Omit<TextFieldProps, "type"> &
      Omit<NumberFieldProps, "type"> &
      Omit<TextAreaFieldProps, "type">
  >;

export type FormFieldConfig = Omit<FormFieldProps, "control">;

export const FormField: FC<FormFieldProps> = (props) => {
  const {
    control,
    name,
    label,
    type,
    placeholder,
    readOnly,
    required = false,
    className,
    inputClassName,
    showError = true,
  } = props;

  return (
    <div className={cn("", className)}>
      {type !== "checkbox" && label && (
        <label className="block text-white mb-1">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <Controller
        control={control}
        name={name}
        render={({ field }) => {
          const commonProps = {
            ...field,
            readOnly,
            required,
            placeholder,
          };

          switch (type) {
            case "select": {
              const selectProps = props as BaseFormFieldProps & SelectFieldProps;
              return (
                <SelectInput
                  options={selectProps.options}
                  value={field.value}
                  onChange={field.onChange}
                  name={field.name}
                  readOnly={readOnly}
                  required={required}
                  placeholder={placeholder}
                  className={inputClassName}
                  buttonClassName={selectProps.buttonClassName}
                  placeholderClassName={selectProps.placeholderClassName}
                  dropdownClassName={selectProps.dropdownClassName}
                  optionClassName={selectProps.optionClassName}
                />
              );
            }

            case "phone": {
              const phoneProps = props as BaseFormFieldProps & PhoneFieldProps;
              return (
                <PhoneInput
                  {...commonProps}
                  type="tel"
                  prefix={phoneProps.prefix}
                  className={inputClassName}
                  prefixClassName={phoneProps.prefixClassName}
                  inputWrapperClassName={phoneProps.inputWrapperClassName}
                />
              );
            }

            case "textarea":
              return <TextArea {...commonProps} className={inputClassName} />;
            case "number":
              return <NumberInput {...commonProps} className={inputClassName} />;
            case "checkbox": {
              const checkboxProps = props as BaseFormFieldProps & CheckboxFieldProps;
              return (
                <CheckboxInput
                  {...commonProps}
                  type="checkbox"
                  label={label}
                  className={inputClassName}
                  labelClassName={checkboxProps.labelClassName}
                  wrapperClassName={checkboxProps.wrapperClassName}
                />
              );
            }

            default:
              // For "text" | "email"
              return <TextInput {...commonProps} type={type} className={inputClassName} />;
          }
        }}
      />

      {showError && (
        <div className={cn("min-h-[18px] mt-1", props.errorClassName)}>
          <Controller
            control={control}
            name={name}
            render={({ fieldState: { error } }) => (error ? <p className="text-[#C41F1F]">{error.message}</p> : <></>)}
          />
        </div>
      )}
    </div>
  );
};
