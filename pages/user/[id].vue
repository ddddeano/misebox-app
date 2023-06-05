<template>
  <div>
    <div class="text-fields">
      {{ user.userInfo }}
      <label for="displayName">Display Name:</label>
      <label for="displayName">Display Name:</label>
      <input
        type="text"
        name="displayName"
        id="displayName"
        v-model="user.userInfo.displayName"
        @input="updateDisplayName(user.userInfo.displayName)"
        :class="{ updated: showUpdateEffect.displayName }"
      />

      <label for="email">Email:</label>
      <input
        type="email"
        name="email"
        id="email"
        v-model="user.userInfo.email"
        @input="updateEmail(user.userInfo.email)"
        :class="{ updated: showUpdateEffect.email }"
      />
    </div>
    <div class="logins">
      {{ user.userInfo.logins }}
    </div>
    <div class="avatar-selection">
      <div
        v-for="(avatarUrl, index) in avatarUrls"
        :key="index"
        class="avatar-container"
      >
        <img
          class="avatar"
          @click="updateImageUrl(avatarUrl)"
          :src="avatarUrl"
          :class="{
            'selected-avatar': user.userInfo.imageUrl === avatarUrl,
            updated: showUpdateEffect.imageUrl,
          }"
          alt="Avatar"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
const user = useMiseboxUserStore();
const avatarUrls = useAvatarUrls();

const showUpdateEffect = reactive({
  displayName: false,
  email: false,
  imageUrl: false,
});

const updateDisplayName = (displayName) => {
  user.userInfo.displayName = displayName;
  updateField('displayName');
};

const updateEmail = (email) => {
  user.userInfo.email = email;
  updateField('email');
};
const updateImageUrl = (url) => {
  user.userInfo.imageUrl = url;
  updateField('imageUrl');
};

const updateField = async (fieldName) => {
  await user.updateFieldInFirebase(fieldName);
  showUpdateEffect[fieldName] = true;
  setTimeout(() => {
    showUpdateEffect[fieldName] = false;
  }, 1000);
};
</script>

<style scoped>
input.updated {
  animation: updated-animation 1s ease-out;
}

@keyframes updated-animation {
  0%,
  100% {
    background-color: white;
  }
  50% {
    background-color: rgba(0, 255, 0, 0.2);
  }
}

.avatar-selection {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  margin: 20px 0;
}

.avatar-container {
  margin: 10px;
}

.avatar-container img {
  width: 100px;
  height: 100px;
  object-fit: cover;
  cursor: pointer;
  border: 2px solid transparent;
}

.selected-avatar {
  border-color: #00a1ff;
}

.text-fields {
  margin-left: 1rem;
}
</style>
