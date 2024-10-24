import quizData from '../data/questions.json'
import type { QuizData, Question } from '../types/quiz'

export const quizService = {
  getQuestions(): Question[] {
    return (quizData as QuizData).questions
  }
}