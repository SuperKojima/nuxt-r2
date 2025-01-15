<script setup lang="ts">
const router = useRouter();
const isUploading = ref(false);
const errorMessage = ref('');

const upload = async (e: Event) => {
  try {
    isUploading.value = true;
    errorMessage.value = '';
    
    const formData = new FormData(e.target as HTMLFormElement);
    const response = await $fetch('/api/r2', {
      method: 'PUT',
      body: formData
    });

    // アップロード成功時はトップページに遷移
    router.push('/');
  } catch (error: any) {
    errorMessage.value = error.data?.message || 'アップロードに失敗しました';
  } finally {
    isUploading.value = false;
  }
};
</script>

<template>
  <div>
    <h2 class="mb-4">/upload</h2>
    <div>
      <form @submit.prevent="upload" class="space-y-4">
        <div>
          <input 
            type="file" 
            name="files"
            multiple 
            accept="image/*"
            class="block w-full" 
            :disabled="isUploading"
          />
        </div>
        
        <div v-if="errorMessage" class="text-red-500">
          {{ errorMessage }}
        </div>

        <button 
          type="submit" 
          class="bg-blue-500 text-white p-2 rounded-md disabled:opacity-50"
          :disabled="isUploading"
        >
          {{ isUploading ? 'アップロード中...' : 'アップロード' }}
        </button>
      </form>
    </div>
  </div>
</template>