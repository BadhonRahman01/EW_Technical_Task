import React from 'react';

const SubscriptionList = ({ subscriptions, users, preferences, onEdit, onDelete }) => {
  // Function to get the user name based on the user ID
  const getUserName = (userId) => {
    const user = users.find(user => user.id === userId);
    return user ? user.name : 'Unknown User';
  };

  const getPreferenceName = (preferenceId) => {
    // Find the preference with the given ID and return its name
    const preference = preferences.find(preference => preference.id === preferenceId);
    return preference ? preference.name : 'Unknown Preference';
  };

  return (
    <div className="container mt-2">
      <h2>Subscription List</h2>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>#</th>
            <th>ID</th>
            <th>Preference Name</th>
            <th>User Name</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {subscriptions.map((subscription, index) => (
            <tr key={subscription.id}>
              <td>{index + 1}</td>
              <td>{subscription.id}</td>
              <td>{getPreferenceName(subscription.preference_id)}</td>
              <td>{getUserName(subscription.user_id)}</td>
              <td>{subscription.enabled === true ? 'Enabled' : 'Disabled'}</td>
              <td>
                <button className="btn btn-outline-warning m-2" onClick={() => onEdit(subscription)}>Edit</button>
                <button className="btn btn-outline-danger m-2" onClick={() => onDelete(subscription.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SubscriptionList;
