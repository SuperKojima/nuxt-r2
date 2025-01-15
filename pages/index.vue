<script setup lang="ts">
const { data, status, refresh } = await useFetch('/api/r2/list');
</script>

<template>
  <div>
    <h2 class="mb-4">/</h2>
    <div class="mb-4">
        <NuxtLink to="/upload/v1" class="bg-blue-500 text-white p-2 rounded-md">upload v1</NuxtLink>
        <NuxtLink to="/upload/v2" class="bg-blue-500 text-white p-2 rounded-md">upload v2(multipart/form-data)</NuxtLink>
    </div>
    <div>
      <pre>{{ data }}</pre>
    </div>
  </div>
</template>