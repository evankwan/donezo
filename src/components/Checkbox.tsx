type Props = {
  checked: boolean;
  onChange: (checked: boolean) => void;
  className?: string;
};

export default function Checkbox({ checked, onChange, className = "" }: Props) {
  return (
    <label className={`inline-flex items-center cursor-pointer ${className}`}>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="sr-only"
      />
      <span
        className={`w-4 h-4 rounded border border-[#333] flex items-center justify-center transition-colors
          ${checked ? "bg-[#f9f9f9]" : "bg-white"}
        `}
      >
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
            />
          </svg>
        )}
      </span>
    </label>
  );
}
