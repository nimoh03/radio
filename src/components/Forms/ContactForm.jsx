import { useState } from "react";

const ContactForm = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    message: "",
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', or null
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!form.name.trim()) {
      newErrors.name = "Name is required";
    }
    
    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    
    if (!form.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required";
    } else if (!/^\+?[\d\s\-\(\)]{10,}$/.test(form.phoneNumber.replace(/\s/g, ''))) {
      newErrors.phoneNumber = "Please enter a valid phone number";
    }
    
    if (!form.message.trim()) {
      newErrors.message = "Message is required";
    } else if (form.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters long";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setForm({ ...form, [id]: value });
    
    // Clear error for this field when user starts typing
    if (errors[id]) {
      setErrors({ ...errors, [id]: "" });
    }
    
    // Clear submit status when user makes changes
    if (submitStatus) {
      setSubmitStatus(null);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    setSubmitStatus(null);
    
    try {
      const response = await fetch('https://api.technaija.fm/api/contact/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      
      // Success
      setSubmitStatus('success');
      setForm({ name: "", email: "", phoneNumber: "", message: "" });
      setErrors({});
      
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputStyle = (fieldName) => ({
    border: errors[fieldName] ? '2px solid #dc3545' : '1px solid #ccc',
    boxShadow: errors[fieldName] ? '0 0 0 0.2rem rgba(220, 53, 69, 0.25)' : 'none',
  });

  return (
    <div className="border-dashed pt-4">
      {/* Success Message */}
      {submitStatus === 'success' && (
        <div className="mb-4 p-3" style={{ 
          backgroundColor: '#d4edda', 
          color: '#155724', 
          border: '1px solid #c3e6cb', 
          borderRadius: '4px',
          marginBottom: '1rem'
        }}>
          <strong>Success!</strong> Your message has been sent successfully. We'll get back to you soon!
        </div>
      )}
      
      {/* Error Message */}
      {submitStatus === 'error' && (
        <div className="mb-4 p-3" style={{ 
          backgroundColor: '#f8d7da', 
          color: '#721c24', 
          border: '1px solid #f5c6cb', 
          borderRadius: '4px',
          marginBottom: '1rem'
        }}>
          <strong>Error!</strong> There was a problem sending your message. Please try again or contact us directly.
        </div>
      )}
      
      <div className="d-grid gap-4">
        <div className="input-wrapper d-grid gap-4">
          <label htmlFor="name">Name *</label>
          <input
            type="text"
            id="name"
            placeholder="Enter Your Name...."
            onChange={handleChange}
            value={form.name}
            style={inputStyle('name')}
            disabled={isSubmitting}
          />
          {errors.name && (
            <span style={{ color: '#dc3545', fontSize: '14px' }}>
              {errors.name}
            </span>
          )}
        </div>
        
        <div className="input-wrapper d-grid gap-4">
          <label htmlFor="email">Email *</label>
          <input
            type="email"
            id="email"
            placeholder="Enter Your Email...."
            onChange={handleChange}
            value={form.email}
            style={inputStyle('email')}
            disabled={isSubmitting}
          />
          {errors.email && (
            <span style={{ color: '#dc3545', fontSize: '14px' }}>
              {errors.email}
            </span>
          )}
        </div>
        
        <div className="input-wrapper d-grid gap-4">
          <label htmlFor="phoneNumber">Phone Number *</label>
          <input
            type="tel"
            id="phoneNumber"
            placeholder="Enter Your Phone Number...."
            onChange={handleChange}
            value={form.phoneNumber}
            style={inputStyle('phoneNumber')}
            disabled={isSubmitting}
          />
          {errors.phoneNumber && (
            <span style={{ color: '#dc3545', fontSize: '14px' }}>
              {errors.phoneNumber}
            </span>
          )}
        </div>
        
        <div className="input-wrapper d-grid gap-4">
          <label htmlFor="message">Message *</label>
          <textarea
            rows="4"
            id="message"
            placeholder="Enter Your Message...."
            onChange={handleChange}
            value={form.message}
            style={inputStyle('message')}
            disabled={isSubmitting}
          />
          {errors.message && (
            <span style={{ color: '#dc3545', fontSize: '14px' }}>
              {errors.message}
            </span>
          )}
        </div>
      </div>
      
      <button
        type="button"
        className="bttn-1 mt-lg-10 mt-sm-6 mt-4"
        onClick={handleFormSubmit}
        disabled={isSubmitting}
        style={{ 
          opacity: isSubmitting ? 0.7 : 1,
          cursor: isSubmitting ? 'not-allowed' : 'pointer'
        }}
      >
        {isSubmitting ? (
          <>
            Sending...
            <span className="icon d-center icon-right">
              <i className="ti ti-loader" style={{ 
                animation: 'spin 1s linear infinite',
                display: 'inline-block'
              }}></i>
            </span>
          </>
        ) : (
          <>
            Send Message
            <span className="icon d-center icon-right">
              <i className="ti ti-arrow-narrow-right"></i>
            </span>
          </>
        )}
      </button>
      
      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default ContactForm;