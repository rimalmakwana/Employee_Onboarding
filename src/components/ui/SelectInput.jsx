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
        error ? "border-danger" : "border-border"
      } rounded-md px-3 py-3 outline-none text-sm box-border bg-white
      focus:border-primary
      transition-colors duration-200
      ${className}`}
      {...props}
    >
      {children}
    </select>
  );
}

export default SelectInput;
