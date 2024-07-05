<!-- frontend/pages/index.vue -->
<template>
  <div>
    <h1>Nuxt 3 + Express</h1>
    <div v-if="data">
      <p>API Response: {{ data.message }}</p>
    </div>
  </div>
</template>

<script setup>
const data = ref(null);

onMounted(async () => {
  const config = useRuntimeConfig();
  const response = await $fetch(`${config.public.apiBaseUrl}/hello`);
  data.value = response;
});
</script>

<style>
body {
  font-family: Arial, sans-serif;
}
</style>
