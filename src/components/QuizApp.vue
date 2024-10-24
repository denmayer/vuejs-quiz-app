<script setup lang="ts">
import { ref, computed } from 'vue'
import { quizService } from '../services/quizService'
import QuizQuestion from './QuizQuestion.vue'
import QuizResults from './QuizResults.vue'
import QuizNavigation from './QuizNavigation.vue'

const questions = quizService.getQuestions()
const currentQuestionIndex = ref(0)
const userAnswers = ref<(number | null)[]>(new Array(questions.length).fill(null))
const quizCompleted = ref(false)

const currentQuestion = computed(() => questions[currentQuestionIndex.value])

const isLastQuestion = computed(() => currentQuestionIndex.value === questions.length - 1)
const isFirstQuestion = computed(() => currentQuestionIndex.value === 0)

const hasUnansweredQuestions = computed(() => userAnswers.value.some(answer => answer === null))

const score = computed(() => {
  return userAnswers.value.reduce((acc, answer, index) => {
    return acc + (answer === questions[index].correctAnswer ? 1 : 0)
  }, 0)
})

const scorePercentage = computed(() => {
  return Math.round((score.value / questions.length) * 100)
})

function selectAnswer(optionIndex: number) {
  userAnswers.value[currentQuestionIndex.value] = optionIndex
}

function goToNextQuestion() {
  if (currentQuestionIndex.value < questions.length - 1) {
    currentQuestionIndex.value++
  }
}

function goToPreviousQuestion() {
  if (currentQuestionIndex.value > 0) {
    currentQuestionIndex.value--
  }
}

function finishQuiz() {
  // Mark unanswered questions as wrong by setting them to an invalid answer index
  userAnswers.value = userAnswers.value.map(answer => answer === null ? -1 : answer)
  quizCompleted.value = true
}

function restartQuiz() {
  currentQuestionIndex.value = 0
  userAnswers.value = new Array(questions.length).fill(null)
  quizCompleted.value = false
}
</script>

<template>
  <div class="max-w-2xl mx-auto">
    <QuizQuestion
      v-if="!quizCompleted"
      :question="currentQuestion"
      :current-number="currentQuestionIndex + 1"
      :total-questions="questions.length"
      :selected-answer="userAnswers[currentQuestionIndex]"
      @select="selectAnswer"
    />

    <QuizNavigation
      v-if="!quizCompleted"
      :is-first-question="isFirstQuestion"
      :is-last-question="isLastQuestion"
      :has-unanswered-questions="hasUnansweredQuestions"
      @previous="goToPreviousQuestion"
      @next="goToNextQuestion"
      @finish="finishQuiz"
    />

    <QuizResults
      v-else
      :score="score"
      :total-questions="questions.length"
      :percentage="scorePercentage"
      @restart="restartQuiz"
    />
  </div>
</template>