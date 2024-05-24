<template>
  <div>
    <p><strong>ID:</strong> {{ user.id }}</p>
    <p><strong>Verified:</strong> {{ user.miseboxUser.verified }}</p>
    <p><strong>Mise Code:</strong> {{ user.miseboxUserProfile.mise_CODE }}</p>
    <p><strong>Account Providers:</strong> {{ user.miseboxUserProfile.account_providers.join(', ') }}</p>
    <p><strong>Account Created:</strong> {{ formatDate(user.miseboxUserProfile.account_created) }}</p>
    <p><strong>Subscription Type:</strong> {{ user.miseboxUserProfile.subscription.type }}</p>
    <p><strong>Subscription Start Date:</strong> {{ formatDate(user.miseboxUserProfile.subscription.start_date) }}</p>
    <p><strong>Subscription Duration (Months):</strong> {{ user.miseboxUserProfile.subscription.duration_months }}</p>
  </div>
</template>

<script setup>
const props = defineProps({
  user: Object
});

// Function to format dates from Unix timestamp
const formatDate = (timestamp) => {
  if (!timestamp) return 'Not available';
  return new Date(timestamp._seconds * 1000).toLocaleDateString("en-US");
};
</script>