import { useEffect, useState } from "react";
import previewImg from "../../images/upload-preview-2.png";
import TextEditor from "./TextEditor";
import { FormProvider, useForm } from "react-hook-form";

const CreateEpisodeForm = () => {
  const [image, setImage] = useState(previewImg);
  const [showError, setShowError] = useState(false);
  const [errorMsg, setErrorMessage] = useState("");
  
  // API related states
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  
  // File upload states
  const [uploadedImageFile, setUploadedImageFile] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);

  const methods = useForm();
  const {
    formState: { errors },
    watch,
  } = methods;

  const onSubmit = async (data) => {
    console.log("Form submitted with data:", data); // Debug log
    
    setIsLoading(true);
    setApiError("");
    setSuccessMessage("");

    try {
      let imageUrl = "";

      // Upload image if available
      if (uploadedImageFile) {
        setUploadingImage(true);
        imageUrl = await uploadFile(uploadedImageFile, 'image');
        setUploadingImage(false);
      }

      // Generate slug from title
      const slug = data.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');

      // Prepare payload according to API expectations
      const payload = {
        title: data.title,
        description: data.description || "",
        audioUrl: data.audioUrl || "",
        videoUrl: data.videoUrl || "",
        imageUrl: imageUrl,
        hostId: 1, // You might want to get this from user context/props
        slug: slug,
        episodeNo: data.episodeNo || ""
      };

      console.log("Payload:", payload);

      // Make API call with hardcoded token
      const response = await fetch('https://api.technaija.fm/api/episode/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Hardcoded authorization token
          'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiIxIiwiZW1haWwiOiJUZWVzb2Z0dGVjaCIsInVuaXF1ZV9uYW1lIjoiMSIsImp0aSI6IjJkMjcwMmM5LWUwYTItNGY2NS05N2NmLWRkMmMwMGU4Yzg4ZSIsIm5iZiI6MTc1NTg5ODYwMCwiZXhwIjoxNzU1OTg1MDAwLCJpYXQiOjE3NTU4OTg2MDAsImlzcyI6Imh0dHBzOi8vdGVjaG5haWphLmZtIiwiYXVkIjoiaHR0cHM6Ly90ZWNobmFpamEuZm0ifQ.UTGPtC0V6z7PF-h7V1GNhM3r-eUjIGYsX5JPysF0_h8`
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Episode created successfully:", result);
      
      setSuccessMessage("Episode created successfully!");
      
      // Reset form after successful submission
      methods.reset();
      setImage(previewImg);
      setUploadedImageFile(null);
      setUploadingImage(false);
      
    } catch (error) {
      console.error("Error creating episode:", error);
      setApiError(error.message || "Failed to create episode. Please try again.");
      setUploadingImage(false);
    } finally {
      setIsLoading(false);
    }
  };

  // Upload any file type to the same endpoint
  const uploadFile = async (file, fileType) => {
    const formData = new FormData();
    formData.append('image', file); // API expects 'image' field name for all file types

    try {
      const response = await fetch('https://api.technaija.fm/api/catalog/upload/image', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error(`Failed to upload ${fileType}`);
      }

      const result = await response.json();
      return result.url || result.imageUrl || result.data?.url; // Adjust based on actual API response structure
    } catch (error) {
      throw new Error(`Failed to upload ${fileType}: ${error.message}`);
    }
  };

  const handleChangeImg = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    if (!file) {
      setShowError(true);
      setErrorMessage("Please select an image file");
      setImage(previewImg);
      return;
    }
    // size validation
    if (file.size > 512000) {
      setShowError(true);
      setErrorMessage("File size should be less than or equal to 512kb");
      setImage(previewImg);
      return;
    }
    setImage(URL.createObjectURL(file));
    setUploadedImageFile(file);
    setShowError(false);
  };

  return (
    <FormProvider {...methods}>
      <form
        action="#"
        className="d-grid gap-sm-6 gap-4"
        onSubmit={methods.handleSubmit(onSubmit)}
      >
        {/* Success/Error Messages */}
        {successMessage && (
          <div className="alert alert-success">
            {successMessage}
          </div>
        )}
        {apiError && (
          <div className="alert alert-danger">
            {apiError}
          </div>
        )}

        {/* Title Field */}
        <div className="input-wrapper d-grid gap-lg-4 gap-2">
          <label htmlFor="title" className="fs-five fw-medium">
            Title <span className="tcp-1">*</span>
          </label>
          <input
            type="text"
            id="title"
            placeholder="Enter Episode Title"
            disabled={isLoading}
            {...methods.register("title", { required: "Title is required" })}
          />
          {errors.title && (
            <span className="tcp-1 fs-sm">{errors.title.message}</span>
          )}
        </div>

        {/* Episode Number Field */}
        <div className="input-wrapper d-grid gap-lg-4 gap-2">
          <label htmlFor="episodeNo" className="fs-five fw-medium">
            Episode Number
          </label>
          <input
            type="text"
            id="episodeNo"
            placeholder="Enter Episode Number (e.g., 001, S01E01)"
            disabled={isLoading}
            {...methods.register("episodeNo")}
          />
        </div>

        {/* Audio URL Section */}
        <div className="input-wrapper d-grid gap-lg-4 gap-2">
          <label htmlFor="audioUrl" className="fs-five fw-medium">
            Audio URL (Optional)
          </label>
          <input
            type="text"
            id="audioUrl"
            placeholder="Enter Audio URL (e.g., https://example.com/audio.mp3)"
            disabled={isLoading}
            {...methods.register("audioUrl")}
          />
        </div>

        {/* Video URL Section */}
        <div className="input-wrapper d-grid gap-lg-4 gap-2">
          <label htmlFor="videoUrl" className="fs-five fw-medium">
            Video URL (Optional)
          </label>
          <input
            type="text"
            id="videoUrl"
            placeholder="Enter Video URL (e.g., https://example.com/video.mp4)"
            disabled={isLoading}
            {...methods.register("videoUrl")}
          />
        </div>

        {/* Image Upload Section */}
        <div className="podcast-img-upload d-grid gap-lg-10 gap-6">
          <div className="d-grid gap-lg-4 gap-2">
            <span className="fs-five fw-medium">Episode Image</span>
            <div className="d-grid gap-lg-6 gap-4">
              <div className="preview-img-area-2">
                <img
                  className="w-100 h-100 rounded-3 previewImg"
                  src={image}
                  alt="preview"
                />
              </div>
              <div className="upload-img-area-2 d-grid gap-lg-6 gap-4">
                <div className="d-grid gap-2">
                  <p className="fs-sm">
                    We recommend uploading an artwork of at least 1400x1400
                    pixels and maximum 512kb. We support jpg, png, gif and tiff
                    formats.
                  </p>
                  <p className="fs-sm tcp-1">
                    A great image speaks louder than words. Don't forget to add
                    one that you feel best represents your podcast!
                  </p>
                </div>
                <div>
                  <button
                    className="bttn-2"
                    type="button"
                    disabled={isLoading || uploadingImage}
                    onClick={() => document.querySelector(".inputFile").click()}
                  >
                    <span className="fs-xl fw-bold">
                      {uploadingImage ? (
                        <i className="ti ti-loader" style={{ animation: 'spin 1s linear infinite' }}></i>
                      ) : (
                        <i className="ti ti-circle-plus"></i>
                      )}
                    </span>
                    <span className="fw-bold">
                      {uploadingImage ? 'Uploading...' : 'Upload Image'}
                    </span>
                  </button>
                  {showError && (
                    <span className="d-block text-danger mt-2">{errorMsg}</span>
                  )}
                  <input
                    type="file"
                    className="inputFile"
                    accept="image/*"
                    hidden
                    disabled={isLoading || uploadingImage}
                    onChange={handleChangeImg}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Description Field */}
        <div className="post-details-input-area d-grid gap-lg-4 gap-2">
          <span className="fs-five fw-semibold">
            Description <span className="tcp-1">*</span>
          </span>
          <TextEditor 
            placeholder="Enter Description" 
            disabled={isLoading}
            name="description"
          />
          {errors.description && (
            <span className="tcp-1 fs-sm">{errors.description.message}</span>
          )}
          <p className="tcp-1 fs-sm">
            Listeners want to know what your podcast is about before they tune
            in. Hook them in with a persuasive description that quickly sums up
            what the main concept and structure of your podcast is.
          </p>
        </div>

        {/* Submit Button */}
        <div className="mt-4">
          <button 
            className="bttn-1" 
            type="submit" 
            disabled={isLoading}
            style={{ opacity: isLoading ? 0.7 : 1 }}
          >
            {isLoading ? (
              <>
                <span className="fw-semibold">Creating Episode...</span>
                <span className="icon d-center icon-right">
                  <i className="ti ti-loader" style={{ animation: 'spin 1s linear infinite' }}></i>
                </span>
              </>
            ) : (
              <>
                <span className="fw-semibold">Create Episode</span>
                <span className="icon d-center icon-right">
                  <i className="ti ti-arrow-right"></i>
                </span>
              </>
            )}
          </button>
        </div>

        {/* Enhanced Loading Overlay */}
        {(isLoading || uploadingImage) && (
          <div 
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(0, 0, 0, 0.6)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              zIndex: 9999,
              backdropFilter: 'blur(4px)'
            }}
          >
            <div style={{ 
              backgroundColor: 'white', 
              padding: '2.5rem', 
              borderRadius: '16px',
              textAlign: 'center',
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
              maxWidth: '320px',
              width: '90%'
            }}>
              <div style={{ marginBottom: '1.5rem' }}>
                <div style={{
                  width: '60px',
                  height: '60px',
                  border: '4px solid #f3f4f6',
                  borderTop: '4px solid #3b82f6',
                  borderRadius: '50%',
                  margin: '0 auto',
                  animation: 'spin 1s linear infinite'
                }}></div>
              </div>
              <h3 style={{ 
                margin: '0 0 0.5rem 0', 
                fontSize: '1.2rem', 
                fontWeight: '600',
                color: '#1f2937'
              }}>
                {uploadingImage ? 'Uploading Image...' : 'Creating Episode...'}
              </h3>
              <p style={{ 
                margin: 0, 
                color: '#6b7280', 
                fontSize: '0.9rem' 
              }}>
                {uploadingImage 
                  ? 'Please wait while we upload your image' 
                  : 'Please wait while we create your episode'
                }
              </p>
              
              {/* Progress dots */}
              <div style={{ 
                display: 'flex', 
                justifyContent: 'center', 
                marginTop: '1rem',
                gap: '4px'
              }}>
                <div style={{
                  width: '8px',
                  height: '8px',
                  backgroundColor: '#3b82f6',
                  borderRadius: '50%',
                  animation: 'bounce 1.4s infinite ease-in-out'
                }}></div>
                <div style={{
                  width: '8px',
                  height: '8px',
                  backgroundColor: '#3b82f6',
                  borderRadius: '50%',
                  animation: 'bounce 1.4s infinite ease-in-out 0.16s'
                }}></div>
                <div style={{
                  width: '8px',
                  height: '8px',
                  backgroundColor: '#3b82f6',
                  borderRadius: '50%',
                  animation: 'bounce 1.4s infinite ease-in-out 0.32s'
                }}></div>
              </div>
            </div>
          </div>
        )}
      </form>

      {/* Enhanced CSS for animations */}
      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @keyframes bounce {
          0%, 80%, 100% {
            transform: scale(0);
          }
          40% {
            transform: scale(1);
          }
        }
      `}</style>
    </FormProvider>
  );
};

export default CreateEpisodeForm;