import React, { useState, useEffect, useCallback } from 'react';
import Swal from 'sweetalert2';
import { useLocation } from 'react-router-dom'; // Import useLocation
import SubscriptionList from '../components/Subscriptions/SubscriptionList';
import AddSubscription from '../components/Subscriptions/AddSubscription';
import EditSubscription from '../components/Subscriptions/EditSubscription';
import { getSubscriptions, deleteSubscription, getUsers, getPreferences, addSubscription, updateSubscription } from '../api/masterClient';

const SubscriptionPage = () => {
  // State variables to manage the subscriptions list, users list, preferences list, and the subscription being edited
  const [subscriptions, setSubscriptions] = useState([]);
  const [users, setUsers] = useState([]);
  const [preferences, setPreferences] = useState([]);
  const [editingSubscription, setEditingSubscription] = useState(null);
  const location = useLocation();

  // useEffect hook to fetch subscriptions, users, and preferences when the component mounts
  const fetchAllData = useCallback(async () => {
    await fetchSubscriptions();
    await fetchUsers();
    await fetchPreferences();
  }, []);
  // useEffect hook to fetch subscriptions, users, and preferences when the component mounts
  useEffect(() => {
    fetchAllData();
  }, [fetchAllData]);
  // Function to fetch subscriptions from the API
  const fetchSubscriptions = async () => {
    const { data, error } = await getSubscriptions();
    if (error) {
      console.error('Error fetching subscriptions:', error);
    } else {
      setSubscriptions(data);
    }
  };
  // Function to fetch users from the API
  const fetchUsers = async () => {
    const { data, error } = await getUsers();
    if (error) {
      console.error('Error fetching users:', error);
    } else {
      setUsers(data);
    }
  };
  // Function to fetch preferences from the API
  const fetchPreferences = async () => {
    const { data, error } = await getPreferences();
    if (error) {
      console.error('Error fetching preferences:', error);
    } else {
      setPreferences(data);
    }
  };
  // Function to add a new subscription
  const handleAdd = async (newSubscription) => {
    try {
      await addSubscription(newSubscription);
      fetchSubscriptions(); // Refresh subscriptions list after adding
    } catch (error) {
      console.error('Error adding subscription:', error);
    }
  };
  // Function to update a subscription
  const handleEdit = async (id, updatedData) => {
    try {
      await updateSubscription(id, updatedData);
      stopEditing(); // Exit edit mode
      fetchSubscriptions(); // Refresh subscriptions list after updating
    } catch (error) {
      console.error('Error updating subscription:', error);
    }
  };
  // Function to delete a subscription
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'Do you really want to delete this subscription?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it',
    });
    // Check if the user confirmed the deletion
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
  // Function to start editing a subscription
  const startEditing = (subscription) => {
    setEditingSubscription(subscription);
  };
  // Function to stop editing a subscription
  const stopEditing = () => {
    setEditingSubscription(null);
  };

  return (
    <div>
      <h6>{`EasyWasteOyTestApp${location.pathname}`}</h6>
      {editingSubscription ? (
        <EditSubscription
          subscription={editingSubscription}
          onEdit={(updatedData) => handleEdit(editingSubscription.id, updatedData)}
          onCancel={stopEditing}
        />
      ) : (
        <AddSubscription onAdd={handleAdd} />
      )}
      <SubscriptionList
        subscriptions={subscriptions}
        users={users}
        preferences={preferences}
        onEdit={startEditing}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default SubscriptionPage;
