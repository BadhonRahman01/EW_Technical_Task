import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { useLocation } from 'react-router-dom'; // Import useLocation
import PreferenceList from '../components/Preferences/PreferenceList';
import AddPreference from '../components/Preferences/AddPreference';
import EditPreference from '../components/Preferences/EditPreference';
import { getPreferences, addPreference, updatePreference, deletePreference } from '../api/masterClient';

const PreferencesPage = () => {
  // State variables to manage the preferences list and the preference being edited
  const [preferences, setPreferences] = useState([]);
  const [editingPreference, setEditingPreference] = useState(null);
  const location = useLocation();
  // useEffect hook to fetch preferences when the component mounts
  useEffect(() => {
    fetchPreferences(); // Fetch preferences on component mount
  }, []);

  // Function to fetch preferences from the API
  const fetchPreferences = async () => {
    try {
      const response = await getPreferences();
      setPreferences(response.data);
    } catch (error) {
      console.error('Error fetching preferences:', error);
    }
  };
  // Function to add a new preference
  const handleAdd = async (newPreference) => {
    try {
      await addPreference(newPreference);
      fetchPreferences(); // Refresh preferences list after adding
    } catch (error) {
      console.error('Error adding preference:', error);
    }
  };
  // Function to update a preference
  const handleEdit = async (id, updatedData) => {
    try {
      await updatePreference(id, updatedData);
      stopEditing(); // Exit edit mode
      fetchPreferences(); // Refresh preferences list after updating
    } catch (error) {
      console.error('Error updating preference:', error);
    }
  };
  // Function to delete a preference
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'Do you really want to delete this preference?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it',
    });
    // Check if the user confirmed the deletion
    if (result.isConfirmed) {
      const { error } = await deletePreference(id);
      if (error) {
        console.error('Error deleting preference:', error);
        Swal.fire('Error', 'There was an issue deleting the preference.', 'error');
      } else {
        fetchPreferences();
        Swal.fire('Deleted!', 'The preference has been deleted.', 'success');
      }
    }
  };
  // Function to start editing a preference
  const startEditing = (preference) => {
    setEditingPreference(preference);
  };
  // Function to stop editing a preference
  const stopEditing = () => {
    setEditingPreference(null);
  };

  return (
    <div>
      <h6>{`EasyWasteOyTestApp${location.pathname}`}</h6>
      {editingPreference ? (
        <EditPreference
          preference={editingPreference}
          onEdit={(updatedData) => handleEdit(editingPreference.id, updatedData)}
          onCancel={stopEditing}
        />
      ) : (
        <AddPreference onAdd={handleAdd} />
      )}
      <PreferenceList
        preferences={preferences}
        onEdit={startEditing}
        onDelete={handleDelete} // Pass handleDelete to PreferenceList
      />
    </div>
  );
};

export default PreferencesPage;
