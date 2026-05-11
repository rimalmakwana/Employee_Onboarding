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
        error ? "border-danger" : "border-border"
      } rounded-md pl-2.5 py-2.5 bg-white
      focus-within:border-primary
      [&:has(input:not(:placeholder-shown))]:bg-primary-light
      transition-colors duration-200
      [&_input]:border-none [&_input]:bg-transparent [&_input]:outline-none [&_input]:focus:border-none`}
      {...props}
    />
  );
}

export default PhoneInputField;
