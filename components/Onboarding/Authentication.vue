<template>
  <div class="authentication-container">
    <!-- Content is always rendered but remains in the background when not authenticated -->
    <Content :cvm="cvm" key="auth-content" />
    <!-- Modal login form that displays over the content when the user is not authenticated -->
    <transition name="fade">
      <div class="modal" v-if="!isAuthenticated">
        <OnboardingLogIn :cvm="cvm" />
      </div>
    </transition>
  </div>
</template>

<script setup>

const props = defineProps({
  cvm: Object
});

const { isAuthenticated } = props.cvm;
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
.authentication-container {
  position: relative;
  width: 100%; /* Ensure the container covers the entire area needed */
  height: 100%; /* Full height to cover all content behind the modal */
}
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(46, 175, 27, 0.5); /* Semi-transparent background */
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
