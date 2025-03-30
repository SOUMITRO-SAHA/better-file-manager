import * as React from "react";

import { cn } from "@/lib/utils";

interface InputProps extends React.ComponentProps<"input"> {
  prefixIcon?: React.ReactNode;
  prefixLabel?: string;
  suffixIcon?: React.ReactNode;
  suffixLabel?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({
    className,
    type,
    prefixIcon,
    prefixLabel,
    suffixIcon,
    suffixLabel,
    ...props
  }: InputProps) => {
    return (
      <div className="flex items-center w-full border border-input rounded-md px-3 py-1 shadow-xs bg-transparent focus-within:ring-2 focus-within:ring-ring/50 focus-within:border-ring">
        {prefixIcon && (
          <span className="mr-2 text-muted-foreground">{prefixIcon}</span>
        )}
        {prefixLabel && (
          <span className="mr-2 text-muted-foreground">{prefixLabel}</span>
        )}
        <input
          type={type}
          data-slot="input"
          className={cn(
            "flex-1 bg-transparent outline-none text-base md:text-sm placeholder:text-muted-foreground file:text-foreground file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
            className,
          )}
          {...props}
        />

        {suffixIcon && (
          <span className="ml-2 text-muted-foreground">{suffixIcon}</span>
        )}
        {suffixLabel && (
          <span className="ml-2 text-muted-foreground">{suffixLabel}</span>
        )}
      </div>
    );
  },
);

export { Input };
