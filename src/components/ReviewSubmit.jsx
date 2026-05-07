import { ArrowLeft ,Check } from "lucide-react";

function ReviewSubmit({ formData, onBack, onSubmit, goToStep }) {
  return (
    <div>
      <h2>Review &amp; Submit</h2>
      <p className="form-subtitle">Confirm your details before submitting</p>

      {/* Personal Info Section */}
      <div className="review-section">
        <div className="review-header">
          <span>PERSONAL INFO</span>
          {/* Edit button goes back to step 1 */}
          <button className="edit-btn" onClick={() => goToStep(1)}>Edit</button>
        </div>
        <div className="review-row">
          <span className="review-key">Full Name</span>
          <span className="review-value">{formData.name}</span>
        </div>
        <div className="review-row">
          <span className="review-key">Email</span>
          <span className="review-value">{formData.email}</span>
        </div>
        <div className="review-row">
          <span className="review-key">Phone</span>
          <span className="review-value">{formData.phone}</span>
        </div>
      </div>

      {/* Work Details Section */}
      <div className="review-section">
        <div className="review-header">
          <span>WORK DETAILS</span>
          {/* Edit button goes back to step 2 */}
          <button className="edit-btn" onClick={() => goToStep(2)}>Edit</button>
        </div>
        <div className="review-row">
          <span className="review-key">Department</span>
          <span className="review-value">{formData.department}</span>
        </div>
        <div className="review-row">
          <span className="review-key">Role</span>
          <span className="review-value">{formData.role}</span>
        </div>
        <div className="review-row">
          <span className="review-key">Experience</span>
          <span className="review-value">{formData.experience} yrs</span>
        </div>
      </div>

      {/* Address Section */}
      <div className="review-section">
        <div className="review-header">
          <span>ADDRESS</span>
          {/* Edit button goes back to step 3 */}
          <button className="edit-btn" onClick={() => goToStep(3)}>Edit</button>
        </div>
        <div className="review-row">
          <span className="review-key">City</span>
          <span className="review-value">{formData.city}</span>
        </div>
        <div className="review-row">
          <span className="review-key">State</span>
          <span className="review-value">{formData.state}</span>
        </div>
        <div className="review-row">
          <span className="review-key">Pincode</span>
          <span className="review-value">{formData.pincode}</span>
        </div>
      </div>

      {/* Back and Submit buttons */}
      <div className="button-container">
        <button className="back-btn" onClick={onBack}><ArrowLeft size={18} /> Back</button>
        <button className="submit-btn" onClick={onSubmit}>Submit <Check /></button>
      </div>
    </div>
  );
}

export default ReviewSubmit;
