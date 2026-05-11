import { Check, PartyPopper } from "lucide-react";

function SuccessScreen({ name, email, onSubmitAnother }) {
  return (
    <div className="text-center">
      {/* Green checkmark circle */}
      <div
        className="w-15 h-15 bg-success-light text-success rounded-full 
      flex items-center justify-center text-3xl font-light mx-auto mb-3.75"
      >
        <Check />
      </div>

      {/* Submitted badge */}
      <span className="inline-block bg-primary-light text-primary px-4 py-1.5 rounded-full text-xs font-semibold mb-5">
        Submitted!
      </span>

      {/* Welcome message */}
      <h2 className="m-0 mb-2.5 text-xl text-text-primary flex items-center justify-center gap-2">
        Welcome aboard, {name}!
        <PartyPopper size={20} />
      </h2>

      <p className="text-text-secondary mb-7.5 text-sm leading-relaxed">
        HR will reach out at <strong className="text-text-primary">{email}</strong>{" "}
        shortly.
      </p>

      {/* This button resets everything back to step 1 */}
      <button
        className="btn-primary px-7.5 mx-auto"
        onClick={onSubmitAnother}
      >
        Submit Another
      </button>
    </div>
  );
}

export default SuccessScreen;
