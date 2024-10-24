<script setup lang="ts">
import type { Question } from '../types/quiz'

defineProps<{
  question: Question
  currentNumber: number
  totalQuestions: number
  selectedAnswer: number | null
}>()

const emit = defineEmits<{
  (e: 'select', optionIndex: number): void
}>()
</script>

<template>
  <div class="bg-white rounded-lg shadow-md p-6">
    <div class="text-gray-600 mb-4">
      Question {{ currentNumber }} of {{ totalQuestions }}
    </div>
    
    <h2 class="text-2xl font-semibold text-gray-800 mb-6">{{ question.text }}</h2>
    
    <div class="space-y-3">
      <button
        v-for="(option, index) in question.options"
        :key="index"
        @click="emit('select', index)"
        :class="[
          'w-full py-4 px-6 text-left border-2 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-opacity-50',
          selectedAnswer === index
            ? 'border-emerald-500 bg-emerald-50'
            : 'border-gray-200 hover:border-emerald-500 hover:bg-emerald-50'
        ]"
      >
        {{ option }}
      </button>
    </div>
  </div>
</template>