<script setup lang="ts">
const { data, status, refresh } = await useFetch('/api/r2/list');

const deleteItem = async (key: string) => {
    const response = await $fetch(`/api/r2`, {
        method: 'DELETE',
        query: {
            key
        }
    });
    console.log(response);
    refresh();
}
</script>

<template>
  <div>
    <h2 class="mb-4">/</h2>
    <nav class="mb-4">
        <ul class="flex gap-4">
            <li>
                <NuxtLink to="/upload/v1" class="bg-blue-500 text-white p-2 rounded-md">upload v1</NuxtLink>
            </li>
            <li>
                <NuxtLink to="/upload/v2" class="bg-blue-500 text-white p-2 rounded-md">upload v2</NuxtLink>
            </li>
        </ul>
    </nav>
    <ul class="grid gap-2">
        <li v-for="item in data?.objects" :key="item.key" class="bg-gray-100 p-4">
            <div>
                {{ item.key }}
            </div>
            <div>
                <img :src="`/assets/${item.key}`" :alt="item.key" width="200" height="auto">
            </div>
            <button @click="deleteItem(item.key)">
                削除
            </button>
        </li>
    </ul>
  </div>
</template>