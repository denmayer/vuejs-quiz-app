export interface Question {
  id: number
  text: string
  options: string[]
  correctAnswer: number
}

export interface QuizData {
  questions: Question[]
}