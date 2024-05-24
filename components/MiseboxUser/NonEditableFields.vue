<template>
  <div>
    <p><strong>ID:</strong> {{ user.id }}</p>
    <p v-if="user.miseboxUser.verified"><strong>Verified:</strong> Yes</p>
    <p v-if="user.miseboxUserProfile.miseCode"><strong>Mise Code:</strong> {{ user.miseboxUserProfile.miseCode }}</p>
    <p v-if="user.miseboxUserProfile.accountProviders.length"><strong>Account Providers:</strong> {{ user.miseboxUserProfile.accountProviders.join(', ') }}</p>
    <p v-if="user.miseboxUserProfile.accountCreated"><strong>Account Created:</strong> {{ formatDate(user.miseboxUserProfile.accountCreated) }}</p>
    <p v-if="user.miseboxUserProfile.subscription.type"><strong>Subscription Type:</strong> {{ user.miseboxUserProfile.subscription.type }}</p>
    <p v-if="user.miseboxUserProfile.subscription.startDate"><strong>Subscription Start Date:</strong> {{ formatDate(user.miseboxUserProfile.subscription.startDate) }}</p>
    <p v-if="user.miseboxUserProfile.subscription.durationMonths"><strong>Subscription Duration (Months):</strong> {{ user.miseboxUserProfile.subscription.durationMonths }}</p>
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

<style scoped>
p {
  margin: 5px 0;
  color: #333;
}
</style>
