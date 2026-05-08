import { Check, PartyPopper } from "lucide-react";

function SuccessScreen({ name, email, onSubmitAnother }) {
  return (
    <div className="text-center">
      {/* Green checkmark circle */}
      <div
        className="w-[60px] h-[60px] bg-[#dcfce7] text-black rounded-full 
      flex items-center justify-center text-[28px] font-light mx-auto mb-[15px]"
      >
        <Check />
      </div>

      {/* Submitted badge */}
      <span cclassName="inline-block bg-[#f3f0ff] text-[#5b4df5] px-4 py-[6px] rounded-full text-[12px] font-semibold mb-5">
        Submitted!
      </span>

      {/* Welcome message */}
      <h2 className="m-0 mb-[10px] text-[20px] text-[#111] flex items-center justify-center gap-2">
        Welcome aboard, {name}!
        <PartyPopper size={20} />
      </h2>

      <p className="text-gray-500 mb-[30px] text-[14px] leading-[1.5]">
        HR will reach out at <strong className="text-[#333]">{email}</strong>{" "}
        shortly.
      </p>

      {/* This button resets everything back to step 1 */}
      <button
        className="bg-[#5b4df5] text-white border-none px-[30px] py-3 rounded-[8px] cursor-pointer
        text-[14px] font-medium hover:bg-[#4a3de0]"
        onClick={onSubmitAnother}
      >
        Submit Another
      </button>
    </div>
  );
}

export default SuccessScreen;
