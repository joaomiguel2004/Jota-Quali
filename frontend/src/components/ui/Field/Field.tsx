import {
  forwardRef,
  useId,
  type InputHTMLAttributes,
  type ReactNode,
} from "react";
import { cn } from "@/lib/cn";
import styles from "./Field.module.css";

export interface FieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hint?: string;
  error?: string;
  required?: boolean;
  rightAdornment?: ReactNode;
}

export const Field = forwardRef<HTMLInputElement, FieldProps>(
  (
    { label, hint, error, required, rightAdornment, id, className, ...rest },
    ref
  ) => {
    const autoId = useId();
    const inputId = id ?? autoId;
    const hintId = hint ? `${inputId}-hint` : undefined;
    const errorId = error ? `${inputId}-error` : undefined;

    return (
      <div className={cn(styles.field, className)}>
        {label && (
          <label htmlFor={inputId} className={styles.label}>
            {label}
            {required && <span className={styles.required}>*</span>}
          </label>
        )}
        <div className={styles.inputWrap}>
          <input
            ref={ref}
            id={inputId}
            aria-invalid={!!error}
            aria-describedby={
              [hintId, errorId].filter(Boolean).join(" ") || undefined
            }
            className={cn(
              styles.input,
              error && styles.invalid,
              rightAdornment && styles.withRight
            )}
            required={required}
            {...rest}
          />
          {rightAdornment && (
            <span className={styles.rightAdornment}>{rightAdornment}</span>
          )}
        </div>
        {hint && !error && (
          <span id={hintId} className={styles.hint}>
            {hint}
          </span>
        )}
        {error && (
          <span id={errorId} className={styles.error} role="alert">
            {error}
          </span>
        )}
      </div>
    );
  }
);
Field.displayName = "Field";
