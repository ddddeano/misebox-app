<template>
  <div>
    <div v-show="expanded === 0">Level one: {{ getLevelOneData() }}</div>
    <div v-show="expanded === 1">Level two: {{ getLevelTwoData() }}</div>
    <div v-show="expanded === 2">Level three: {{ getLevelThreeData() }}</div>
    <button @click="cycleExpandedState">Cycle State</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  hierarchy: {
    type: Array,
    required: true,
  },
  expanded: {
    type: Number,
    default: 0,
  },
});

const expanded = ref(props.expanded);

const getLevelOneData = () => {
  // Logic for retrieving level one data from prop.hierarchy
  const levelOneData = props.hierarchy[0]; // Placeholder logic, replace with your implementation
  return levelOneData;
};

const getLevelTwoData = () => {
  // Logic for retrieving level two data from prop.hierarchy
  const levelTwoData = props.hierarchy[1]; // Placeholder logic, replace with your implementation
  return levelTwoData;
};

const getLevelThreeData = () => {
  // Logic for retrieving level three data from prop.hierarchy
  const levelThreeData = props.hierarchy[2]; // Placeholder logic, replace with your implementation
  return levelThreeData;
};

const cycleExpandedState = () => {
  expanded.value = (expanded.value + 1) % 3; // Cycles between 0, 1, and 2
};
</script>
