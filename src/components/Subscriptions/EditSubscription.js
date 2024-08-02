import React, { useState, useEffect } from 'react';
import { updateSubscription, getPreferences, getUsers } from '../../api/masterClient';

const EditSubscription = ({ subscription, onEdit, onCancel }) => {
  const [preferenceId, setPreferenceId] = useState(subscription.preference_id);
  const [enabled, setEnabled] = useState(subscription.enabled);
  const [userId, setUserId] = useState(subscription.user_id);
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
    const updatedSubscription = {
      id: subscription.id,
      preference_id: preferenceId,
      enabled,
      user_id: userId,
    };
    try {
      const { error } = await updateSubscription(subscription.id, updatedSubscription);
      if (!error && onEdit) {
        onEdit(updatedSubscription);
      }
    } catch (error) {
      console.error('Error updating subscription:', error);
    }
  };

  return (
    <div className="container mt-4">
      <h5 className="display-5">Edit Subscription (ID={subscription.id})</h5>
      <form onSubmit={handleSubmit}>
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
        <button type="submit" className="btn btn-primary">Update Subscription</button>
        <button type="button" className="btn btn-danger m-2" onClick={onCancel}>Cancel</button>
      </form>
    </div>
  );
};

export default EditSubscription;
