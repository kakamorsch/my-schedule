<template>
  <div class="flex flex-col items-center justify-center min-h-screen p-4">
    <div class="text-center">
      <h1 class="text-2xl font-bold mb-4">Bem vindo ao Minha Agenda</h1>
      <p class="text-gray-600">Gerencie seus contatos e agenda de forma simples e intuitiva.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

onMounted(() => {
  console.log(authStore.state.isAuthenticated)
  if (!authStore.state.isAuthenticated) {
    router.push('/login')
  }
})
</script>
