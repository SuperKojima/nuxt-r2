<script setup lang="ts">
const upload = async (e: Event) => {
  const formData = new FormData(e.target as HTMLFormElement);
  const response = await $fetch('/api/r2', {
    method: 'PUT',
    body: formData
  });
  console.log(response);
};
</script>

<template>
  <div>
    <h2 class="mb-4">/upload</h2>
    <div>
      <form @submit.prevent="upload">
        <input type="file" multiple accept="image/*" />
        <button type="submit" class="bg-blue-500 text-white p-2 rounded-md">upload</button>
      </form>
    </div>
  </div>
</template>