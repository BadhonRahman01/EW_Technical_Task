import React, { useState } from 'react';

const EditPreference = ({ preference, onEdit, onCancel }) => {
  const [name, setName] = useState(preference.name);
  const [description, setDescription] = useState(preference.description);

  const handleSubmit = (e) => {
    e.preventDefault();
    onEdit({ name, description });
  };

  return (
    <form onSubmit={handleSubmit}>
        <div class="container">
            <h5 class="display-5">Edit Preference (ID={preference.id})</h5>
            <label for="name">Name:</label>
            <input class="form-control my-2"
                type="text" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                required 
            />
            <label for="name">Description (Optional) :</label>
            <input class="form-control my-2"
                type="text" 
                value={description} 
                onChange={(e) => setDescription(e.target.value)} 
                required 
            />

            <button class="btn btn-primary" type="submit">Update Preference</button>
            <button class="btn btn-danger mx-2" type="button" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
};

export default EditPreference;
