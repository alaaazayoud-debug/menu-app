<template>
  <h2>العدّاد: {{ count }}</h2>
  <button @click="inc">+</button>
  <button @click="dec">−</button>
</template>

<script setup>
import { ref } from 'vue'

// متغير تفاعلي
const count = ref(0)

// دوال الحدث
function inc() {
  count.value++
}
function dec() {
  count.value--
}
</script>

<style scoped>
button {
  margin: 0.25rem;
  padding: 0.5rem 1rem;
}
</style>
