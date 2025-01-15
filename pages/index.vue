<script setup lang="ts">
const { data, status, refresh } = await useFetch('/api/r2/list');
</script>

<template>
  <div>
    <h2 class="mb-4">/</h2>
    <div class="mb-4">
        <NuxtLink to="/upload" class="bg-blue-500 text-white p-2 rounded-md">upload</NuxtLink>
    </div>
    <div>
      <pre>{{ data }}</pre>
    </div>
  </div>
</template>