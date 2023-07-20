<template>
  <div class="toggle-slider">
    <div class="options">
      <div
        v-for="(option, index) in options"
        :key="index"
        :class="{ active: activeOption === option }"
        @click="handleOptionClick(option)"
        tabindex="0"
        role="button"
        class="toggle-option"
      >
        {{ option }}
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  options: {
    type: Array,
    required: true,
  },
  activeOption: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(['update:activeOption']);

const handleOptionClick = (option) => {
  console.log('Option clicked:', option);
  emit('update:activeOption', option);
};
</script>

<style scoped lang="scss">
.toggle-slider {
  display: flex;
  justify-content: space-between;
  width: 100%;
  border-radius: 25px;
  overflow: hidden;
  background-color: var(--primary-color);
}

.options {
  display: flex;
  width: 100%;
}

.toggle-option {
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  font-weight: bold;
  border: none;
  background-color: var(--primary-color);
  color: var(--secondary-color-dark-text);
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
}

.toggle-option.active {
  background-color: var(--primary-color-dark);
}
</style>
