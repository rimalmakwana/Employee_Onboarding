import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

/**
 
 * Props:
 *  error: boolean — shows red border when true
 *  value: string — current phone value
 *  onChange: function — change handler
 *  All other PhoneInput props are forwarded via rest spread
 */
function PhoneInputField({ error = false, value, onChange, ...props }) {
  return (
    <PhoneInput
      value={value}
      onChange={onChange}
      className={`w-full border ${
        error ? "border-red-500" : "border-gray-300"
      } rounded-[6px] pl-[10px] py-1 bg-white
      focus-within:border-[#5b4df5]
      [&:has(input:not(:placeholder-shown))]:bg-[#e8f0fe]
      transition-colors duration-200
      [&_input]:border-none [&_input]:bg-transparent [&_input]:outline-none [&_input]:focus:border-none`}
      {...props}
    />
  );
}

export default PhoneInputField;
