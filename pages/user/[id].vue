<template>
  <div>
    <div class="text-fields">
      <label for="displayName">Display Name:</label>
      <input
        type="text"
        name="displayName"
        id="displayName"
        v-model="user.userInfo.displayName"
        @change="updateDisplayName(user.userInfo.displayName)"
        :class="{ updated: showUpdateEffect.displayName }"
      />

      <label for="email">Email:</label>
      <input
        type="email"
        name="email"
        id="email"
        v-model="user.userInfo.email"
        @change="updateEmail(user.userInfo.email)"
        :class="{ updated: showUpdateEffect.email }"
      />

      <label for="dwelling">Dwelling:</label>
      <input
        type="text"
        name="dwelling"
        id="dwelling"
        v-model="user.userInfo.defaultAddress.dwelling"
        @change="updateDwelling(user.userInfo.defaultAddress.dwelling)"
        :class="{ updated: showUpdateEffect.dwelling }"
      />

      <label for="street">Street:</label>
      <input
        type="text"
        name="street"
        id="street"
        v-model="user.userInfo.defaultAddress.street"
        @change="updateStreet(user.userInfo.defaultAddress.street)"
        :class="{ updated: showUpdateEffect.street }"
      />

      <label for="deliveryZone">Delivery Zone:</label>
      <select
        id="deliveryZone"
        name="deliveryZone"
        v-model="user.userInfo.defaultAddress.deliveryZone"
        @change="updateDeliveryZone(user.userInfo.defaultAddress.deliveryZone)"
        :class="{ updated: showUpdateEffect.deliveryZone }"
      >
        <option v-for="zone in zoneNames" :key="zone" :value="zone">
          {{ zone }}
        </option>
      </select>
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
          :class="{ 'avatar-selected': user.userInfo.imageUrl === avatarUrl }"
          alt="Avatar"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
const { zoneNames } = useDeliveryZones();
const user = useMiseboxUser();
const avatarUrls = useAvatarUrls();

const showUpdateEffect = reactive({
  displayName: false,
  email: false,
  imageUrl: false,
  dwelling: false,
  street: false,
  deliveryZone: false,
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

const updateDwelling = (dwelling) => {
  user.userInfo.defaultAddress.dwelling = dwelling;
  updateField('defaultAddress.dwelling');
};

const updateStreet = (street) => {
  user.userInfo.defaultAddress.street = street;
  updateField('defaultAddress.street');
};

const updateDeliveryZone = (deliveryZone) => {
  user.userInfo.defaultAddress.deliveryZone = deliveryZone;
  updateField('defaultAddress.deliveryZone');
};

const updateField = async (fieldName) => {
  await user.updateFieldInFirebase(fieldName);
  showUpdateEffect[fieldName] = true;
  setTimeout(() => {
    showUpdateEffect[fieldName] = false;
  }, 1000);
};
</script>

<style lang="scss" scoped>
input.updated,
select.updated {
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
  border: 2px solid var(--primary-color-light);
}

.avatar-container img {
  width: 100px;
  height: 100px;
  object-fit: cover;
  cursor: pointer;
  border: 4px solid var(--primary-color-dark);

  border-radius: 50%;
}

.avatar-container .avatar-selected {
  border-color: var(--selected);
}

.text-fields {
  margin-left: 1rem;
}
</style>
