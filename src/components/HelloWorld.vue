<script setup>
defineProps({
  msg: {
    type: String,
    required: true
  }
})
</script>

<template>
  <div class="greetings" style="border: 1px dotted red;">
    <h1 class="green">{{ msg }}</h1>
  </div>
</template>

<style scoped>

</style>
