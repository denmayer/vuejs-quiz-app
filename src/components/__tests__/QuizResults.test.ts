import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import QuizResults from '../QuizResults.vue'

describe('QuizResults', () => {
  it('displays score and percentage correctly', () => {
    const wrapper = mount(QuizResults, {
      props: {
        score: 3,
        totalQuestions: 5,
        percentage: 60
      }
    })

    expect(wrapper.text()).toContain('3')
    expect(wrapper.text()).toContain('5')
    expect(wrapper.text()).toContain('60%')
  })

  it('emits restart event when button is clicked', async () => {
    const wrapper = mount(QuizResults, {
      props: {
        score: 3,
        totalQuestions: 5,
        percentage: 60
      }
    })

    await wrapper.find('button').trigger('click')
    expect(wrapper.emitted('restart')).toBeTruthy()
  })
})