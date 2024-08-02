import React, { useState } from 'react';

const AddPreference = ({ onAdd }) => {
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd({ name });
    setName(''); // Clear input after submission
  };

  return (
    <form onSubmit={handleSubmit}>
        <div class="container">
            <label for="name">Add a new preference:</label>
            <input  class="form-control my-2"
                type="text" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                placeholder="Preference Name" 
                required 
            />
            <button type="submit" class="btn btn-primary">Add Preference</button>
        </div>
    </form>
  );
};

export default AddPreference;
