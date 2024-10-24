import { describe, it, expect } from 'vitest'
import { quizService } from '../quizService'

describe('quizService', () => {
  it('returns questions from JSON data', () => {
    const questions = quizService.getQuestions()
    
    expect(Array.isArray(questions)).toBe(true)
    expect(questions.length).toBeGreaterThan(0)
    
    const firstQuestion = questions[0]
    expect(firstQuestion).toHaveProperty('id')
    expect(firstQuestion).toHaveProperty('text')
    expect(firstQuestion).toHaveProperty('options')
    expect(firstQuestion).toHaveProperty('correctAnswer')
  })

  it('has valid question structure', () => {
    const questions = quizService.getQuestions()
    
    questions.forEach(question => {
      expect(typeof question.id).toBe('number')
      expect(typeof question.text).toBe('string')
      expect(Array.isArray(question.options)).toBe(true)
      expect(typeof question.correctAnswer).toBe('number')
      expect(question.correctAnswer).toBeLessThan(question.options.length)
    })
  })
})