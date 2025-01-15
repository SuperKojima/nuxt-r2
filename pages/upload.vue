<script setup lang="ts">
const upload = async (e: Event) => {
  const formData = new FormData(e.target as HTMLFormElement);
  const response = await $fetch('/api/r2', {
    method: 'PUT',
    body: formData
  });
  navigateTo('/');
};
</script>

<template>
  <div>
    <h2 class="mb-4">/upload/v2</h2>
    <div>
      <form
        @submit.prevent="upload"
        enctype="multipart/form-data"
        class="bg-gray-100 p-4 rounded-md grid gap-4"
      >
        <input 
          type="file"
          multiple
          name="images"
          accept="image/*"
        />
        <button 
          type="submit" 
          class="bg-blue-500 text-white p-2 rounded-md"
        >
          アップロード
        </button>
      </form>
    </div>
  </div>
</template>