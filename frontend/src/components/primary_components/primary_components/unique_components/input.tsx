import { InputHTMLAttributes } from "react";

interface InputBoxProps extends InputHTMLAttributes<HTMLInputElement> {
  // Explicitly defining props that were already destructured/typed,
  // though InputHTMLAttributes covers them. Keeping them for clarity or specific defaults.
  // We can just rely on the interface extension.
}

export default function InputBox({
  type = "text",
  name = "",
  placeholder = "",
  value = "",
  onChange,
  className = "w-11/12 h-10 p-2 mb-3 text-xs bg-gray-200 rounded-sm",
  ...props
}: InputBoxProps) {
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={className}
      {...props}
    />
  );
}
