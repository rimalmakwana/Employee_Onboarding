/**
 
 * Props:
 * error: boolean — shows red border when true
 * children: <option> elements
 * All standard <select> props are forwarded via rest spread
 */
function SelectInput({ error = false, className = "", children, ...props }) {
  return (
    <select
      className={`w-full border ${
        error ? "border-red-500" : "border-gray-300"
      } rounded-[6px] px-3 py-3 outline-none text-[14px] box-border bg-white
      focus:border-[#5b4df5]
      transition-colors duration-200
      ${className}`}
      {...props}
    >
      {children}
    </select>
  );
}

export default SelectInput;
