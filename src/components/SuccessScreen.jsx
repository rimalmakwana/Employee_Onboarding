function SuccessScreen({ name, email, onSubmitAnother }) {
  return (
    <div className="success-container">

      {/* Green checkmark circle */}
      <div className="success-circle">✓</div>

      {/* Submitted badge */}
      <span className="success-badge">Submitted!</span>

      {/* Welcome message */}
      <h2 className="success-title">Welcome aboard, {name}! 🎉</h2>

      <p className="success-text">
        HR will reach out at <strong>{email}</strong> shortly.
      </p>

      {/* This button resets everything back to step 1 */}
      <button className="submit-another-btn" onClick={onSubmitAnother}>
        Submit Another
      </button>

    </div>
  );
}

export default SuccessScreen;
