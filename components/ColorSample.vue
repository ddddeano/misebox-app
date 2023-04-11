<template>
  <div class="color-sample" @click="copyToClipboard">
    <div class="circle"></div>
    <div class="color-name">{{ name }}</div>
  </div>
</template>

<script setup>
const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
});
const copyToClipboard = () => {
  navigator.clipboard.writeText(props.color);
};
</script>

<style lang="scss" scoped>
.color-sample {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.circle {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: v-bind(color);
}

.color-name {
  font-size: 14px;
  margin-top: 8px;
  text-align: center;
}
</style>
