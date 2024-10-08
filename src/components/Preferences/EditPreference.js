import React, { useState, useEffect } from 'react';

const EditPreference = ({ preference, onEdit, onCancel }) => {
  // State variables to manage the input values for name and description
  const [name, setName] = useState(preference.name);
  const [description, setDescription] = useState(preference.description);

  // useEffect hook to update the state when the preference prop changes
  useEffect(() => {
    setName(preference.name);
    setDescription(preference.description);
  }, [preference]);

  // Function to handle the form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    onEdit({ name, description }); // Call the onEdit function passed as a prop with the updated preference data
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="container">
        <h2>Edit Preference (ID={preference.id})</h2>
        <label htmlFor="name">Name:</label>
        <input
          className="form-control my-2"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <label htmlFor="description">Description (Optional):</label>
        <input
          className="form-control my-2"
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <button className="btn btn-primary" type="submit">
          Update Preference
        </button>
        <button className="btn btn-danger mx-2" type="button" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EditPreference;
