/**
 * Props:
 *  error: boolean — shows red border when true
 *  All standard <input> props are forwarded via rest spread
 */
function TextInput({ error = false, className = "", ...props }) {
  return (
    <input
      className={`w-full border ${error ? "border-danger" : "border-border"
        } rounded-md px-3 py-3 outline-none text-sm box-border
      focus:border-primary
      [&:not(:placeholder-shown)]:bg-primary-light
      transition-colors duration-200
      ${className}`}
      {...props}
    />
  );
}

export default TextInput;
