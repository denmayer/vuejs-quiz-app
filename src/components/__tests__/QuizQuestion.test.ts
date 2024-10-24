import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import QuizQuestion from '../QuizQuestion.vue'
import type { Question } from '../../types/quiz'

describe('QuizQuestion', () => {
  const mockQuestion: Question = {
    id: 1,
    text: 'Test question?',
    options: ['Option 1', 'Option 2', 'Option 3', 'Option 4'],
    correctAnswer: 2
  }

  it('renders question text and options', () => {
    const wrapper = mount(QuizQuestion, {
      props: {
        question: mockQuestion,
        currentNumber: 1,
        totalQuestions: 3,
        selectedAnswer: null
      }
    })

    expect(wrapper.text()).toContain('Test question?')
    mockQuestion.options.forEach(option => {
      expect(wrapper.text()).toContain(option)
    })
  })

  it('emits select event when option is clicked', async () => {
    const wrapper = mount(QuizQuestion, {
      props: {
        question: mockQuestion,
        currentNumber: 1,
        totalQuestions: 3,
        selectedAnswer: null
      }
    })

    await wrapper.findAll('button')[1].trigger('click')
    expect(wrapper.emitted('select')?.[0]).toEqual([1])
  })

  it('highlights selected answer', () => {
    const wrapper = mount(QuizQuestion, {
      props: {
        question: mockQuestion,
        currentNumber: 1,
        totalQuestions: 3,
        selectedAnswer: 1
      }
    })

    const buttons = wrapper.findAll('button')
    expect(buttons[1].classes()).toContain('border-emerald-500')
    expect(buttons[0].classes()).not.toContain('border-emerald-500')
  })
})