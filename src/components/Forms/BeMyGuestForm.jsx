import { useState } from "react";

const BeMyGuestForm = () => {
  const [form, setForm] = useState({
    fullName: "",
    emailAddress: "",
    phoneNumber: "",
    role: "",
    organization: "",
    reason: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', or null
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value || '' });
    
    // Clear any previous error when user starts typing
    if (submitStatus === 'error') {
      setSubmitStatus(null);
      setErrorMessage('');
    }
  };

  const validateForm = () => {
    const requiredFields = ['fullName', 'emailAddress', 'role', 'reason'];
    const emptyFields = requiredFields.filter(field => !form[field].trim());
    
    if (emptyFields.length > 0) {
      setErrorMessage('Please fill in all required fields');
      return false;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.emailAddress)) {
      setErrorMessage('Please enter a valid email address');
      return false;
    }

    // Basic phone validation
   

    return true;
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      setSubmitStatus('error');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);
    setErrorMessage('');

    try {
    
      const response = await fetch('https://api.technaija.fm/api/guestrequest/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form)
      });

     

      if (response.ok) {
        const responseData = await response.json();
      
        setSubmitStatus('success');
        // Reset form only after confirmed success
        setForm({
          fullName: "",
          emailAddress: "",
          phoneNumber: "",
          role: "",
          organization: "",
          reason: "",
        });
      } else {
        let errorMessage = `Server error: ${response.status}`;
        try {
          const errorData = await response.json();
       
          errorMessage = errorData.message || errorData.error || errorMessage;
        } catch (parseError) {
         
          const errorText = await response.text();
        
          errorMessage = errorText || errorMessage;
        }
        throw new Error(errorMessage);
      }
    } catch (error) {
     
      setSubmitStatus('error');
      
      // Handle different types of errors
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        setErrorMessage('Network error. Please check your internet connection and try again.');
      } else if (error.message.includes('CORS')) {
        setErrorMessage('CORS error. Please contact support if this persists.');
      } else {
        setErrorMessage(error.message || 'Something went wrong. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Success Message */}
      {submitStatus === 'success' && (
        <div className="alert alert-success mb-4 p-3 rounded" style={{backgroundColor: '#d4edda', border: '1px solid #c3e6cb', color: '#155724'}}>
          <div className="d-flex align-items-center gap-2">
            <i className="ti ti-check-circle fs-5"></i>
            <span className="fw-medium">Application Submitted Successfully!</span>
          </div>
          <p className="mb-0 mt-2" style={{fontSize: '14px'}}>
            Thank you for your interest! We'll review your application and get back to you soon.
          </p>
        </div>
      )}

      {/* Error Message */}
      {submitStatus === 'error' && (
        <div className="alert alert-danger mb-4 p-3 rounded" style={{backgroundColor: '#f8d7da', border: '1px solid #f5c6cb', color: '#721c24'}}>
          <div className="d-flex align-items-center gap-2">
            <i className="ti ti-alert-circle fs-5"></i>
            <span className="fw-medium">Submission Failed</span>
          </div>
          <p className="mb-0 mt-2" style={{fontSize: '14px'}}>{errorMessage}</p>
        </div>
      )}

      <form action="#" className="border-dashed pt-4" onSubmit={handleFormSubmit}>
        <div className="d-grid gap-4">
          {/* Row 1: Name + Email */}
          <div className="row g-4">
            <div className="col-md-6">
              <div className="input-wrapper d-grid gap-2">
                <label htmlFor="fullName">
                  Full Name <span style={{color: '#dc3545'}}>*</span>
                </label>
                <input
                  type="text"
                  id="fullName"
                  placeholder="Enter your full name..."
                  onChange={handleChange}
                  value={form.fullName}
                  required
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="input-wrapper d-grid gap-2">
                <label htmlFor="emailAddress">
                  Email Address <span style={{color: '#dc3545'}}>*</span>
                </label>
                <input
                  type="email"
                  id="emailAddress"
                  placeholder="Enter your email..."
                  onChange={handleChange}
                  value={form.emailAddress}
                  required
                />
              </div>
            </div>
          </div>

          {/* Row 2: Phone + Role */}
          <div className="row g-4">
            <div className="col-md-6">
              <div className="input-wrapper d-grid gap-2">
                <label htmlFor="phoneNumber">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phoneNumber"
                  placeholder="Enter your phone..."
                  onChange={handleChange}
                  value={form.phoneNumber}
               
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="input-wrapper d-grid gap-2">
                <label htmlFor="role">
                  Role / Title <span style={{color: '#dc3545'}}>*</span>
                </label>
                <input
                  type="text"
                  id="role"
                  placeholder="e.g. Founder, Engineer, Lecturer"
                  onChange={handleChange}
                  value={form.role}
                  required
                />
              </div>
            </div>
          </div>

          {/* Row 3: Organisation */}
          <div className="input-wrapper d-grid gap-2">
            <label htmlFor="organization">Organisation / Startup</label>
            <input
              type="text"
              id="organization"
              placeholder="Your organisation or project..."
              onChange={handleChange}
              value={form.organization}
            />
          </div>

          {/* Row 4: Message */}
          <div className="input-wrapper d-grid gap-2">
            <label htmlFor="reason">
              Why do you want to be a guest? <span style={{color: '#dc3545'}}>*</span>
            </label>
            <textarea
              rows="4"
              id="reason"
              placeholder="Tell us about your story, expertise, or topic..."
              onChange={handleChange}
              value={form.reason}
              required
            ></textarea>
          </div>
        </div>

        {/* Button */}
        <button
          type="submit"
          className="bttn-1 mt-lg-10 mt-sm-6 mt-4"
          disabled={isSubmitting}
          style={isSubmitting ? {opacity: 0.7, cursor: 'not-allowed'} : {}}
        >
          {isSubmitting ? (
            <>
              <span style={{marginRight: '8px'}}>⏳</span>
              Submitting...
            </>
          ) : (
            <>
              Submit Application
              <span className="icon d-center icon-right">
                <i className="ti ti-arrow-narrow-right"></i>
              </span>
            </>
          )}
        </button>

        {/* Additional Info */}
     
      </form>
    </>
  );
};

export default BeMyGuestForm;