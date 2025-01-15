<script setup lang="ts">
const { data, status, refresh } = await useFetch('/api/r2', {
    method: 'GET',
});

const deleteItem = async (key: string) => {
    const response = await $fetch(`/api/r2`, {
        method: 'DELETE',
        query: {
            key
        }
    });
    refresh();
}
</script>

<template>
  <div>
    <div class="mb-6">
        <NuxtLink to="/upload" class="bg-blue-500 text-white p-2 rounded-md">
            Upload Images
        </NuxtLink>
    </div>
    <ul class="grid grid-cols-2 gap-4 mb-10">
        <li v-for="item in data?.objects" :key="item.key" class="bg-gray-100 p-4">
            <button @click="deleteItem(item.key)" class="bg-red-500 text-white p-1 rounded-md text-sm">
                Delete
            </button>
            <div class="text-sm text-gray-500">
                {{ item.key }}
            </div>
            <div>
                <img :src="`/assets/${item.key}`" :alt="item.key" width="200" height="auto">
            </div>
        </li>
    </ul>
  </div>
</template>