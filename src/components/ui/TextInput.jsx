/**
 * Props:
 *  error: boolean — shows red border when true
 *  All standard <input> props are forwarded via rest spread
 */
function TextInput({ error = false, className = "", ...props }) {
  return (
    <input
      className={`w-full border ${
        error ? "border-red-500" : "border-gray-300"
      } rounded-[6px] px-3 py-3 outline-none text-[14px] box-border
      focus:border-[#5b4df5]
      [&:not(:placeholder-shown)]:bg-[#e8f0fe]
      transition-colors duration-200
      ${className}`}
      {...props}
    />
  );
}

export default TextInput;
