<template>
  <div class="profile-container">
    <div class="profile-section">
      <h2>Personal Information</h2>
      <div class="input-group">
        <label for="handle">Handle:</label>
        <input id="handle" v-model="user.miseboxUser.handle" />
        <button @click="updateField('handle')">Update</button>
      </div>
      <div class="input-group">
        <label for="displayName">Display Name:</label>
        <input id="displayName" v-model="user.miseboxUser.displayName" />
        <button @click="updateField('displayName')">Update</button>
      </div>
      <div class="input-group">
        <label for="email">Email:</label>
        <input id="email" v-model="user.miseboxUserProfile.email" />
        <button @click="updateField('email')">Update</button>
      </div>
      <div class="input-group">
        <label for="imageURL">Image URL:</label>
        <input id="imageURL" v-model="user.miseboxUser.imageURL" />
        <button @click="updateField('imageURL')">Update</button>
      </div>
      <div class="input-group">
        <label>Full Name:</label>
        <input v-model="user.miseboxUser.full_name.first" placeholder="First" />
        <input v-model="user.miseboxUser.full_name.middle" placeholder="Middle" />
        <input v-model="user.miseboxUser.full_name.last" placeholder="Last" />
        <button @click="updateFullName">Update</button>
      </div>
    </div>
    <div class="profile-section">
      <h2>User Roles</h2>
      <div class="roles-group">
        <h3>Roles you have:</h3>
        <ul>
          <li v-for="(role, index) in user.miseboxUser.user_roles" :key="index">
            {{ role }}
            <button @click="removeRole(index)">Remove</button>
          </li>
        </ul>
      </div>
      <div class="roles-group">
        <h3>Roles you do not have:</h3>
        <ul>
          <li v-for="(role, index) in rolesNotInUserRoles" :key="index">
            {{ role }}
            <button @click="addRole(role)">Add</button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, computed } from 'vue';

const props = defineProps({
  user: Object
});

const emit = defineEmits(['update-user']);

const allRoles = ["professional", "chef", "recruiter"]; // List of all possible roles

const updateField = (field) => {
  emit('update-user', { field, value: props.user.miseboxUser[field] });
};

const updateFullName = () => {
  emit('update-user', {
    field: 'full_name',
    value: {
      first: props.user.miseboxUser.full_name.first,
      middle: props.user.miseboxUser.full_name.middle,
      last: props.user.miseboxUser.full_name.last
    }
  });
};

const addRole = (role) => {
  props.user.miseboxUser.user_roles.push(role);
  emit('update-user', { field: 'user_roles', value: props.user.miseboxUser.user_roles });
};

const removeRole = (index) => {
  props.user.miseboxUser.user_roles.splice(index, 1);
  emit('update-user', { field: 'user_roles', value: props.user.miseboxUser.user_roles });
};

// Compute roles the user doesn't have
const rolesNotInUserRoles = computed(() => {
  return allRoles.filter(role => !props.user.miseboxUser.user_roles.includes(role));
});
</script>

<style scoped>
.profile-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

.profile-section {
  margin-bottom: 20px;
}ß

.input-group {
  margin-bottom: 10px;
  display: flex;
  align-items: center;
}

.input-group label {
  width: 120px;
  margin-right: 10px;
}

.roles-group {
  margin-top: 20px;
}

.roles-group h3 {
  margin-bottom: 10px;
}
</style>