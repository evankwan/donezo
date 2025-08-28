import React, { useId } from "react";

interface Props {
  checked: boolean;
  onChange: (checked: boolean) => void;
  className?: string;
}

const Checkbox: React.FC<Props> = ({ checked, onChange, className = "" }) => {
  const id = useId();

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === " " || e.key === "Enter") {
      e.preventDefault();
      onChange(!checked);
    }
  };

  return (
    <label
      htmlFor={id}
      tabIndex={0}
      className={`inline-flex items-center cursor-pointer ${className}`}
      onKeyDown={handleKeyDown}
    >
      <input
        id={id}
        tabIndex={-1}
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="sr-only"
      />
      <span className="w-4 h-4 rounded border border-[#333] flex items-center justify-center transition-colors bg-[#f9f9f9]">
        {checked && (
          <svg
            className="w-3 h-3 text-[#333]"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
              strokeWidth="3"
            />
          </svg>
        )}
      </span>
    </label>
  );
};

export default Checkbox;
