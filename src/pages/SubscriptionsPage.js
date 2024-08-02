import React, { useState } from 'react';
import SubscriptionList from '../components/Subscriptions/SubscriptionList';
import AddSubscription from '../components/Subscriptions/AddSubscription';
import EditSubscription from '../components/Subscriptions/EditSubscription';

const SubscriptionsPage = () => {
  const [editingSubscription, setEditingSubscription] = useState(null);

  const startEditing = (subscription) => {
    setEditingSubscription(subscription);
  };

  const stopEditing = () => {
    setEditingSubscription(null);
  };

  return (
    <div>
      <h1>Subscriptions</h1>
      {editingSubscription ? (
        <EditSubscription subscription={editingSubscription} stopEditing={stopEditing} />
      ) : (
        <AddSubscription />
      )}
      <SubscriptionList startEditing={startEditing} />
    </div>
  );
};

export default SubscriptionsPage;

