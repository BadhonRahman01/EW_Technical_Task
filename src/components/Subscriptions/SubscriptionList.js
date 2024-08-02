import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { getSubscriptions, deleteSubscription, getUsers, getPreferences } from '../../api/masterClient';

const SubscriptionList = ({ startEditing }) => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [users, setUsers] = useState([]);
  const [preferences, setPreferences] = useState([]);

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    await fetchSubscriptions();
    await fetchUsers();
    await fetchPreferences();
  };

  const fetchSubscriptions = async () => {
    const { data, error } = await getSubscriptions();
    if (error) {
      console.error('Error fetching subscriptions:', error);
    } else {
      setSubscriptions(data);
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

  const fetchPreferences = async () => {
    const { data, error } = await getPreferences();
    if (error) {
      console.error('Error fetching preferences:', error);
    } else {
      setPreferences(data);
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'Do you really want to delete this subscription?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it',
    });

    if (result.isConfirmed) {
      const { error } = await deleteSubscription(id);
      if (error) {
        console.error('Error deleting subscription:', error);
        Swal.fire('Error', 'There was an issue deleting the subscription.', 'error');
      } else {
        fetchSubscriptions();
        Swal.fire('Deleted!', 'The subscription has been deleted.', 'success');
      }
    }
  };

  const getUserName = (userId) => {
    const user = users.find(user => user.id === userId);
    return user ? user.name : 'Unknown User';
  };

  const getPreferenceName = (preferenceId) => {
    const preference = preferences.find(preference => preference.id === preferenceId);
    return preference ? preference.name : 'Unknown Preference';
  };

  return (
            <div class="container">
            <h5 class="display-5">Subscription List</h5>
            <table class="table table-bordered">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>ID</th>
                        <th>Preference Name</th>
                        <th>User Name</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {subscriptions.map((subscription) => (
                    <tr key={subscription.id}>
                        <td>{subscriptions.indexOf(subscription) + 1}</td>
                        <td>{subscription.id}</td>
                        <td>{getPreferenceName(subscription.preference_id)}</td>
                        <td>{getUserName(subscription.user_id)}</td>
                        <td>
                        <button class="btn btn-outline-warning m-2" onClick={() => startEditing(subscription)}>Edit</button>
                        <button class="btn btn-outline-danger m-2" onClick={() => handleDelete(subscription.id)}>Delete</button>
                        </td>
                    </tr>
                    ))}
                </tbody>
            </table>
            </div>
  );
};

export default SubscriptionList;
