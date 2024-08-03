import React, { useState } from 'react';

const AddPreference = ({ onAdd }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd({ name, description });
    setName(''); // Clear input after submission
    setDescription(''); // Clear input after submission
  };

  return (
    <form onSubmit={handleSubmit}>
      <div class="container">
        <h2>Add Preference</h2>
        <label for="name">Name:</label>
        <input class="form-control my-2"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Preference Name"
          required
        />
        <label for="name">Description (Optional) :</label>
        <input class="form-control my-2"
          type="textbox"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Preference Description"
          nullable
        />
        <button type="submit" class="btn btn-primary">Add Preference</button>
      </div>
    </form>
  );
};

export default AddPreference;
