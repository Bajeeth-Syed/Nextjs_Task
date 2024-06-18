import { useState } from "react";

export default function FormPopup({ onSubmit, onClose }) {
  const [formData, setFormData] = useState({
    // Add your form fields here
    id: "",
    name: "",
    language: "",
    version: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSubmit(formData);
    onClose(); // Close the form after submission
  };

  return (
    <div className="popup">
      <div className="popup-inner">
        <h2>Submit Data</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>id:</label>
            <input
              type="text"
              name="id"
              value={formData.id}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>language:</label>
            <input
              type="text"
              name="language"
              value={formData.language}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>version:</label>
            <input
              type="text"
              name="version"
              value={formData.version}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit">Submit</button>
          <button type="button" onClick={onClose}>
            Close
          </button>
        </form>
      </div>
    </div>
  );
}
