<script setup lang="ts">
defineProps<{
  score: number
  totalQuestions: number
  percentage: number
}>()

const emit = defineEmits<{
  (e: 'restart'): void
}>()
</script>

<template>
  <div class="bg-white rounded-lg shadow-md p-6 text-center">
    <h2 class="text-2xl font-bold text-gray-800 mb-6">Quiz Completed!</h2>
    <div class="space-y-2 mb-8">
      <p class="text-xl text-gray-700">
        Your Score: <span class="font-semibold">{{ score }}</span> out of <span class="font-semibold">{{ totalQuestions }}</span>
      </p>
      <p class="text-xl text-gray-700">
        Percentage: <span class="font-semibold">{{ percentage }}%</span>
      </p>
    </div>
    <button 
      @click="emit('restart')" 
      class="bg-emerald-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-emerald-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-opacity-50"
    >
      Take Quiz Again
    </button>
  </div>
</template>