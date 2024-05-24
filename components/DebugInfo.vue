<template>
  <div class="debug-info">
    <div>FirebaseUser{{ firebaseUser }}</div>
    <div>MiseboxUser{{ miseboxUser }}</div>
    <button @click="signOut" class="sign-out-button">Test Clear Misebox User</button>

  </div>
</template>

<script setup>



const props = defineProps({
  firebaseUser: {
    type: Object,
    required: true,
  }
});



</script>

<style scoped>
.debug-info {
  margin-top: 20px;
  color: #333;
  background-color: #d11616;
  padding: 10px;
  border-radius: 4px;
  font-size: 14px;
}
.sign-out-button {
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 16px;
  color: white;
  background-color: #007BFF;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
.sign-out-button:hover {
  background-color: #0056b3;
}
</style>
