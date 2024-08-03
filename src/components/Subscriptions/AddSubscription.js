import React, { useState, useEffect } from 'react';
import { addSubscription, getPreferences, getUsers } from '../../api/masterClient';

const AddSubscription = ({ onAdd }) => {
  const [preferenceId, setPreferenceId] = useState('');
  const [enabled, setEnabled] = useState(false);
  const [userId, setUserId] = useState('');
  const [preferences, setPreferences] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchPreferences();
    fetchUsers();
  }, []);

  const fetchPreferences = async () => {
    const { data, error } = await getPreferences();
    if (error) {
      console.error('Error fetching preferences:', error);
    } else {
      setPreferences(data);
    }
  };

  const fetchUsers = async () => {
    const { data, error } = await getUsers();
    if (error) {
      console.error('Error fetching users:', error);
    } else {
      setUsers(data);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newSubscription = {
      preference_id: preferenceId,
      enabled,
      user_id: userId,
    };
    try {
      await addSubscription(newSubscription);
      if (onAdd) {
        onAdd(newSubscription);
      }
    } catch (error) {
      console.error('Error adding subscription:', error);
    }
    setPreferenceId('');
    setEnabled(false);
    setUserId('');
  };

  return (
    <div className="container mt-4">
      <form onSubmit={handleSubmit}>
        <div class="row mb-2">
          <h2>Add Subscription</h2>
          <div class="col-md-6">
            <div className="form-group">
              <label htmlFor="preferenceSelect">Preference</label>
              <select
                className="form-control"
                id="preferenceSelect"
                value={preferenceId}
                onChange={(e) => setPreferenceId(e.target.value)}
                required
              >
                <option value="">Select Preference</option>
                {preferences.map(preference => (
                  <option key={preference.id} value={preference.id}>{preference.name}</option>
                ))}
              </select>
            </div>
          </div>
          <div class="col-md-6">
            <div className="form-group">
              <label htmlFor="userSelect">User</label>
              <select
                className="form-control"
                id="userSelect"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                required
              >
                <option value="">Select User</option>
                {users.map(user => (
                  <option key={user.id} value={user.id}>{user.name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className="form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="enabledCheck"
            checked={enabled}
            onChange={(e) => setEnabled(e.target.checked)}
          />
          <label className="form-check-label" htmlFor="enabledCheck">Enabled</label>
        </div>
        <button type="submit" className="btn btn-primary mt-3">Add Subscription</button>
      </form>
    </div>
  );
};

export default AddSubscription;
