import React, { useState } from 'react';

const EditPreference = ({ preference, onEdit, onCancel }) => {
  const [name, setName] = useState(preference.name);

  const handleSubmit = (e) => {
    e.preventDefault();
    onEdit({ name });
  };

  return (
    <form onSubmit={handleSubmit}>
        <div class="container">
        <label for="name">Edit preference:</label>
            <input class="form-control my-2"
                type="text" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                required 
            />
            <button class="btn btn-primary" type="submit">Update Preference</button>
            <button class="btn btn-danger mx-2" type="button" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
};

export default EditPreference;
